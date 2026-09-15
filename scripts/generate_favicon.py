import struct
import math

def create_icon_pixel_data(size):
    # Returns list of rows (from bottom to top!) of (B, G, R, A)
    # Background: Rounded rectangle with gradient from indigo (#4F46E5 -> rgb 79, 70, 229) to violet (#7C3AED -> rgb 124, 58, 237)
    # Foreground: White wrench / tool symbol
    pixels = []
    
    corner_radius = size * 0.22
    
    for y_bottom_up in range(size):
        # In DIB, row 0 is the BOTTOM row of the image!
        # Convert to normal top-down y (0 at top, size-1 at bottom)
        y = (size - 1) - y_bottom_up
        row = []
        for x in range(size):
            # Check rounded rect boundary
            # Distance from corners
            dx = 0
            if x < corner_radius:
                dx = corner_radius - x
            elif x > (size - 1 - corner_radius):
                dx = x - (size - 1 - corner_radius)
                
            dy = 0
            if y < corner_radius:
                dy = corner_radius - y
            elif y > (size - 1 - corner_radius):
                dy = y - (size - 1 - corner_radius)
                
            dist = math.sqrt(dx * dx + dy * dy)
            if dist > corner_radius + 0.5:
                # Outside rounded corner - transparent
                row.append((0, 0, 0, 0))
                continue
            
            # Anti-aliasing alpha on corner edges
            alpha = 255
            if dist > corner_radius - 0.5:
                alpha = int(255 * max(0.0, min(1.0, (corner_radius + 0.5 - dist))))

            # Gradient background
            t = (x + y) / float(2 * size)
            r_bg = int(79 + (124 - 79) * t)
            g_bg = int(70 + (58 - 70) * t)
            b_bg = int(229 + (237 - 229) * t)

            # Check if this pixel is part of the white tool symbol (wrench / gear / pulse)
            # Normalize coordinates to -1.0 to 1.0
            nx = (x - size / 2.0) / (size / 2.0)
            ny = (y - size / 2.0) / (size / 2.0)

            # Draw wrench shape:
            # Handle is a diagonal bar from bottom-left to center-right
            # Angle ~ 45 degrees: along line nx == ny
            # Handle: from (-0.4, 0.4) to (0.1, -0.1) in screen coordinates
            # Rotate by -45 deg: u = (nx + ny) / sqrt(2), v = (ny - nx) / sqrt(2)
            u = (nx + ny) * 0.7071
            v = (ny - nx) * 0.7071

            is_symbol = False

            # Wrench head (top-right, around nx=0.3, ny=-0.3)
            hx, hy = nx - 0.3, ny - (-0.3)
            head_dist = math.sqrt(hx * hx + hy * hy)
            if head_dist < 0.36:
                # Hollow center cutout
                cut_u = (hx + hy) * 0.7071
                cut_v = (hy - hx) * 0.7071
                if not (cut_u > 0 and abs(cut_v) < 0.16):
                    is_symbol = True

            # Wrench handle (diagonal bar)
            if -0.45 <= u <= 0.25 and abs(v) < 0.12:
                is_symbol = True

            # Wrench tail end (bottom-left, round knob with hole)
            tx, ty = nx - (-0.38), ny - 0.38
            tail_dist = math.sqrt(tx * tx + ty * ty)
            if tail_dist < 0.18:
                if tail_dist > 0.08:
                    is_symbol = True
                else:
                    is_symbol = False

            if is_symbol:
                # Pure crisp white with soft highlight
                row.append((255, 255, 255, alpha))
            else:
                row.append((b_bg, g_bg, r_bg, alpha))
                
        pixels.append(row)
        
    return pixels

def encode_ico_image(size):
    pixels = create_icon_pixel_data(size)
    
    # BMP Info Header (40 bytes)
    biSize = 40
    biWidth = size
    biHeight = size * 2  # XOR mask height + AND mask height
    biPlanes = 1
    biBitCount = 32
    biCompression = 0
    biSizeImage = size * size * 4
    biXPelsPerMeter = 2835  # ~72 DPI
    biYPelsPerMeter = 2835
    biClrUsed = 0
    biClrImportant = 0
    
    header = struct.pack('<IIIHHIIIIII',
        biSize, biWidth, biHeight, biPlanes, biBitCount,
        biCompression, biSizeImage, biXPelsPerMeter, biYPelsPerMeter,
        biClrUsed, biClrImportant
    )
    
    # XOR mask (pixels)
    xor_data = bytearray()
    for row in pixels:
        for b, g, r, a in row:
            xor_data.extend([b, g, r, a])
            
    # AND mask (1-bit per pixel, 0 = opaque, 1 = transparent, row padded to 4 bytes)
    and_row_bytes = (size + 31) // 32 * 4
    and_data = bytearray()
    for row in pixels:
        row_bits = 0
        bit_pos = 7
        row_bytes = bytearray(and_row_bytes)
        byte_idx = 0
        for b, g, r, a in row:
            if a == 0:
                row_bytes[byte_idx] |= (1 << bit_pos)
            bit_pos -= 1
            if bit_pos < 0:
                bit_pos = 7
                byte_idx += 1
        and_data.extend(row_bytes)
        
    image_bytes = header + bytes(xor_data) + bytes(and_data)
    return image_bytes

def generate_ico(sizes, output_path):
    images = []
    for s in sizes:
        images.append((s, encode_ico_image(s)))
        
    # ICO Header: 6 bytes
    # idReserved = 0 (2B), idType = 1 (2B), idCount = len(images) (2B)
    ico_header = struct.pack('<HHH', 0, 1, len(images))
    
    # Calculate offsets
    entries = []
    current_offset = 6 + 16 * len(images)
    
    for size, data in images:
        bWidth = size if size < 256 else 0
        bHeight = size if size < 256 else 0
        bColorCount = 0
        bReserved = 0
        wPlanes = 1
        wBitCount = 32
        dwBytesInRes = len(data)
        dwImageOffset = current_offset
        
        entry = struct.pack('<BBBBHHII',
            bWidth, bHeight, bColorCount, bReserved,
            wPlanes, wBitCount, dwBytesInRes, dwImageOffset
        )
        entries.append(entry)
        current_offset += len(data)
        
    with open(output_path, 'wb') as f:
        f.write(ico_header)
        for e in entries:
            f.write(e)
        for _, data in images:
            f.write(data)

if __name__ == '__main__':
    generate_ico([16, 32, 48], 'public/favicon.ico')
    print('Successfully generated public/favicon.ico with 16x16, 32x32, and 48x48 icon frames.')
