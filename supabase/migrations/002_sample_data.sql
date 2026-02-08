-- Sample Data for Testing
-- Run this in Supabase SQL Editor to populate the database with test content

-- =============================================
-- 1. INSERT SAMPLE FARM DIARY POSTS
-- =============================================

INSERT INTO farm_diary_posts (
  slug, title, excerpt, content, 
  plant_name, plant_date, harvest_date, days_to_harvest,
  survival_rate, harvest_weight,
  planting_method, watering_frequency,
  lessons_learned, images,
  status, published_at
) VALUES
(
  'xa-lach-lan-1',
  'Nhật ký #1 - Xà lách lần đầu tiên',
  'Lần đầu tiên thử trồng xà lách từ hạt. Ghi lại toàn bộ quá trình từ gieo hạt đến thu hoạch.',
  '# Xà lách lần đầu tiên

## Chuẩn bị

Tôi bắt đầu với 1 khay xốp 72 ô để gieo hạt xà lách. Hạt mua từ cửa hàng nông nghiệp, giá khoảng 20k/gói.

## Quá trình

### Tuần 1: Gieo hạt
- Ngày 1: Gieo hạt vào khay xốp
- Ngày 3: Hạt bắt đầu nảy mầm (rất thích!)
- Ngày 7: Lá mầm đã to rõ

### Tuần 2-3: Chăm sóc
- Tưới nước 2 lần/ngày
- Đặt ở ban công có ánh sáng
- Bón phân hữu cơ pha loãng

### Tuần 4: Thu hoạch
Sau 30 ngày, xà lách đã đủ to để ăn được!

## Kết quả

Tỷ lệ sống: 85%
Khối lượng: 1.2kg
Chất lượng: Tốt, giòn và ngọt

## Bài học

1. ✅ Cần ánh sáng nhiều
2. ✅ Không tưới quá nhiều nước
3. ❌ Nên giảm mật độ gieo',
  'Xà lách',
  '2024-01-01',
  '2024-02-01',
  30,
  85.00,
  1.20,
  'Gieo hạt trong khay xốp 72 ô',
  'Tưới 2 lần/ngày vào sáng và chiều',
  '["Cần ánh sáng nhiều", "Không tưới quá nhiều nước", "Nên giảm mật độ gieo"]'::jsonb,
  '["https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800"]'::jsonb,
  'published',
  '2024-02-01 10:00:00'
),
(
  'cai-thia-lan-1',
  'Nhật ký #2 - Cải thìa xanh tươi',
  'Thử trồng cải thìa vì nghe nói dễ chăm sóc hơn xà lách. Kết quả khá bất ngờ!',
  '# Cải thìa xanh tươi

## Tại sao chọn cải thìa?

Sau thành công với xà lách, tôi muốn thử một loại rau dễ trồng hơn. Cải thìa được nhiều người recommend vì:
- Mọc nhanh (chỉ 25-30 ngày)
- Ít sâu bệnh
- Không cần nhiều dinh dưỡng

## Chi tiết quá trình

### Chuẩn bị
- Đất trộn: 50% đất vườn + 30% mùn cưa + 20% phân hữu cơ
- Khay gieo: Khay xốp 50 ô
- Hạt giống: Cải thìa Nhật Bản

### Chăm sóc
Dễ hơn xà lách nhiều! Chỉ cần:
1. Tưới nước đều đặn
2. Đặt nơi thoáng mát
3. Bón phân 1 lần/tuần

### Thu hoạch
Ngày 25 đã có thể thu hoạch lá non. Ngày 30 cây đã to đẹp.

## So sánh với xà lách

| Tiêu chí | Xà lách | Cải thìa |
|----------|---------|----------|
| Độ khó | ⭐⭐⭐ | ⭐⭐ |
| Thời gian | 30 ngày | 25 ngày |
| Tỷ lệ sống | 85% | 92% |
| Chất lượng | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Kết luận

Cải thìa là lựa chọn tuyệt vời cho người mới bắt đầu. Mọc nhanh, dễ chăm, ít vấn đề!',
  'Cải thìa',
  '2024-02-05',
  '2024-03-05',
  28,
  92.00,
  2.10,
  'Gieo hạt trong khay xốp, sau đó trồng vào chậu',
  'Tưới 2 lần/ngày, ưu tiên buổi sáng',
  '["Cải thìa dễ trồng hơn xà lách", "Mọc nhanh, ít sâu bệnh", "Nên trồng khoảng cách 10cm"]'::jsonb,
  '["https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800"]'::jsonb,
  'published',
  '2024-03-05 15:30:00'
),
(
  'rau-muong-thuy-canh',
  'Nhật ký #3 - Rau muống thủy canh đơn giản',
  'Thử nghiệm trồng rau muống bằng phương pháp thủy canh cực kỳ đơn giản với chai nhựa.',
  '# Rau muống thủy canh

## Ý tưởng

Sau 2 lần trồng thành công bằng đất, tôi muốn thử phương pháp thủy canh. Bắt đầu với rau muống vì:
- Dễ trồng từ cành
- Mọc rất nhanh
- Phù hợp thủy canh

## Dụng cụ siêu đơn giản

- Chai nhựa 1.5L (cắt làm đôi)
- Dung dịch dinh dưỡng thủy canh
- Cành rau muống từ chợ

## Cách làm

1. **Cắt chai**: Cắt chai làm 2 phần
2. **Đảo ngược**: Lật phần trên úp xuống phần dưới
3. **Cho cành vào**: Cắm cành rau muống vào miệng chai
4. **Đổ dung dịch**: Đổ dung dịch vào phần dưới

## Kết quả sau 2 tuần

- Ngày 3: Rễ bắt đầu mọc
- Ngày 7: Rễ dài 5-7cm
- Ngày 10: Lá non mọc ra
- Ngày 14: Đã có thể thu hoạch!

## Ưu điểm thủy canh

✅ Sạch sẽ, không cần đất
✅ Mọc cực nhanh
✅ Dễ quan sát rễ
✅ Tiết kiệm nước

## Nhược điểm

❌ Cần thay dung dịch 3 ngày/lần
❌ Phải đặt nơi có ánh sáng tốt
❌ Không trồng được nhiều cây

## Tips

- Dùng chai màu tối để tránh rêu
- Thay dung dịch thường xuyên
- Cắt tỉa đều để cây đều nhau

Tôi sẽ tiếp tục thử nghiệm với các loại rau khác!',
  'Rau muống',
  '2024-03-10',
  '2024-03-24',
  14,
  98.00,
  0.80,
  'Thủy canh từ cành, dùng chai nhựa',
  'Thay dung dịch 3 ngày/lần',
  '["Rau muống thủy canh rất dễ", "Cần ánh sáng tốt", "Thay dung dịch thường xuyên"]'::jsonb,
  '["https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=800"]'::jsonb,
  'published',
  '2024-03-24 09:00:00'
);

-- =============================================
-- 2. INSERT SAMPLE GUIDES
-- =============================================

INSERT INTO guides (
  slug, title, excerpt, content,
  category, difficulty, reading_time,
  tags, cover_image, images,
  status, published_at
) VALUES
(
  'bat-dau-trong-rau-sach',
  '🌱 Bắt đầu trồng rau sạch tại nhà',
  'Hướng dẫn chi tiết cho người mới bắt đầu trồng rau tại nhà. Từ A đến Z.',
  '# Bắt đầu trồng rau sạch tại nhà

## Tại sao nên trồng rau tại nhà?

1. **An toàn thực phẩm**: Biết nguồn gốc, không thuốc trừ sâu
2. **Tiết kiệm chi phí**: Giảm chi tiêu mua rau
3. **Sở thích lành mạnh**: Vừa giảm stress vừa có rau ăn
4. **Giáo dục con cái**: Dạy trẻ về thiên nhiên

## Chuẩn bị gì?

### Dụng cụ cơ bản
- Chậu hoặc khay xốp
- Đất trồng (có thể mua sẵn)
- Hạt giống
- Xẻng nhỏ, vòi tưới

### Chi phí ban đầu
Khoảng 200-300k là có thể bắt đầu

## Các loại rau dễ trồng

### Cho người mới

1. **Rau muống**: Dễ nhất, chỉ cần nước là mọc
2. **Cải thìa**: 25 ngày thu hoạch
3. **Xà lách**: 30 ngày, đẹp mắt

### Cho người có kinh nghiệm
- Cà chua
- Ớt
- Dưa chuột

## Lời khuyên

> Hãy bắt đầu với 1-2 loại rau đơn giản. Đừng tham nhiều!

Sau khi thành công, bạn sẽ tự tin hơn để mở rộng.',
  'basics',
  'Cơ bản',
  5,
  '["người mới", "cơ bản", "hướng dẫn"]'::jsonb,
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
  '[]'::jsonb,
  'published',
  '2024-01-15 10:00:00'
),
(
  'chon-dat-trong-phu-hop',
  '🌍 Cách chọn đất trồng phù hợp',
  'Đất tốt = cây khỏe. Hướng dẫn chọn và pha trộn đất trồng rau hiệu quả.',
  '# Cách chọn đất trồng phù hợp

## Tại sao đất quan trọng?

Đất cung cấp:
- Dinh dưỡng cho cây
- Nơi neo rễ
- Giữ nước và thoát nước

## Các loại đất

### 1. Đất vườn
**Ưu điểm**: Rẻ, dễ kiếm
**Nhược điểm**: Có thể có sâu bệnh

### 2. Đất pha chế
**Ưu điểm**: Sạch, đủ dinh dưỡng
**Nhược điểm**: Giá cao hơn

### 3. Phụ gia

- **Mùn cưa**: Thoát nước tốt
- **Phân hữu cơ**: Dinh dưỡng
- **Trấu hun**: Xốp, nhẹ

## Công thức pha đất chuẩn

```
50% đất vườn hoặc đất mua
30% mùn cưa hoặc xơ dừa  
20% phân hữu cơ
```

## Cách kiểm tra đất tốt

1. **Bóp thử**: Đất nắm chặt, buông ra rời
2. **Tưới nước**: Nước thấm đều, không đọng
3. **Màu sắc**: Màu nâu sẫm, không quá sáng

## Bảo quản đất

- Để nơi khô ráo
- Đậy kín tránh mưa
- Trộn đều trước khi dùng

## Lưu ý

⚠️ Không dùng đất cũ đã trồng nhiều lần mà không bổ sung dinh dưỡng!',
  'basics',
  'Cơ bản',
  7,
  '["đất trồng", "cơ bản", "chuẩn bị"]'::jsonb,
  'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
  '[]'::jsonb,
  'published',
  '2024-02-01 14:00:00'
),
(
  'thuy-canh-don-gian',
  '💧 Thủy canh đơn giản tại nhà',
  'Trồng rau không cần đất! Hướng dẫn làm hệ thống thủy canh đơn giản với vật liệu tái chế.',
  '# Thủy canh đơn giản tại nhà

## Thủy canh là gì?

Thủy canh (hydroponics) là phương pháp trồng cây không dùng đất, thay vào đó dùng nước có pha dung dịch dinh dưỡng.

## Ưu điểm

✅ Sạch sẽ, không bụi bẩn
✅ Tiết kiệm nước (90% so với trồng đất)
✅ Mọc nhanh hơn 30-50%
✅ Ít sâu bệnh
✅ Không gian nhỏ vẫn trồng được

## Hệ thống đơn giản nhất

### Cần gì?
1. Chai nhựa 1.5L-2L
2. Dung dịch thủy canh (mua sẵn)
3. Cành hoặc hạt giống
4. Bông hoặc mút xốp

### Làm thế nào?

**Bước 1**: Cắt chai làm 2 phần (tỷ lệ 1:2)
**Bước 2**: Lật phần trên úp xuống phần dưới
**Bước 3**: Nhét bông vào miệng chai
**Bước 4**: Cắm cành hoặc gieo hạt
**Bước 5**: Đổ dung dịch vào phần dưới

## Các loại rau phù hợp

### Dễ nhất
- Rau muống
- Rau ngót  
- Rau dền

### Trung bình
- Xà lách
- Cải thìa
- Húng quế

## Chăm sóc

### Hàng ngày
- Kiểm tra mực nước
- Bổ sung nước/dung dịch khi cạn

### Mỗi 3 ngày
- Thay hoàn toàn dung dịch

### Lưu ý
⚠️ Dùng chai màu tối để tránh rêu
⚠️ Đặt nơi có ánh sáng nhưng không quá nắng
⚠️ Không để dung dịch cạn khô

## Chi phí

| Hạng mục | Giá |
|----------|-----|
| Dung dịch (500ml) | 50k |
| Vật liệu (chai, bông) | 0đ (tái chế) |
| **Tổng** | **50k** |

Rẻ và hiệu quả!

## Tips nâng cao

- Thêm máy sục khí để rễ phát triển tốt hơn
- Dùng nhiều chai, tạo vườn thủy canh mini
- Kết hợp đèn LED nếu thiếu ánh sáng

Hãy thử ngay hôm nay! 🌱',
  'advanced',
  'Nâng cao',
  10,
  '["thủy canh", "không đất", "hiện đại"]'::jsonb,
  'https://images.unsplash.com/photo-1530836176-60273fddcc3d?w=800',
  '[]'::jsonb,
  'published',
  '2024-03-01 11:00:00'
);

-- =============================================
-- 3. INSERT SAMPLE HARVESTS
-- =============================================

INSERT INTO harvests (
  product_name, variety, plant_date, harvest_date,
  quantity, unit, quality_rating, quality_notes,
  status, images
) VALUES
(
  'Xà lách',
  'Xà lách xanh',
  '2024-01-01',
  '2024-02-01',
  1.20,
  'kg',
  4,
  'Lá giòn, ngọt tự nhiên. Màu xanh tươi đẹp mắt.',
  'available',
  '["https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400"]'::jsonb
),
(
  'Cải thìa',
  'Cải thìa Nhật',
  '2024-02-05',
  '2024-03-05',
  2.10,
  'kg',
  5,
  'Chất lượng tuyệt vời! Lá to, xanh đậm, không sâu bệnh.',
  'available',
  '["https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400"]'::jsonb
),
(
  'Rau muống',
  'Rau muống nước',
  '2024-03-10',
  '2024-03-24',
  0.80,
  'kg',
  5,
  'Mọc cực nhanh, ngon, giòn. Thủy canh thành công!',
  'available',
  '["https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400"]'::jsonb
);

-- =============================================
-- 4. UPDATE SITE STATS
-- =============================================

UPDATE site_stats SET stat_value = 3 WHERE stat_key = 'total_diary_posts';
UPDATE site_stats SET stat_value = 3 WHERE stat_key = 'total_guides';
UPDATE site_stats SET stat_value = 3 WHERE stat_key = 'total_harvests';
UPDATE site_stats SET stat_value = 4 WHERE stat_key = 'total_kg_harvested';
UPDATE site_stats SET stat_value = 30 WHERE stat_key = 'days_farming';
UPDATE site_stats SET stat_value = 3 WHERE stat_key = 'varieties_tried';

-- =============================================
-- DONE! 🎉
-- =============================================

-- Verify data
SELECT COUNT(*) as farm_diary_count FROM farm_diary_posts WHERE status = 'published';
SELECT COUNT(*) as guides_count FROM guides WHERE status = 'published';
SELECT COUNT(*) as harvests_count FROM harvests;
SELECT * FROM site_stats ORDER BY stat_key;
