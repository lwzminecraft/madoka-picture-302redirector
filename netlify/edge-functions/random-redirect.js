/**
 * Netlify Edge Function — 根据设备类型随机重定向图片。
 * 通过 User-Agent 判断手机端 / 电脑端，自动选择对应比例的图片：
 *   手机端 → 竖屏图片 (portrait, h > w)
 *   电脑端 → 横屏图片 (landscape, w > h)
 *   方形图片同时加入两端
 */
export default async (request, context) => {
  const userAgent = request.headers.get("User-Agent") || "";

  const isMobile = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(userAgent);

  // 竖屏图片 — 适合手机端 (旧13 + 新27 + 方形5+1 + 新29 + 方形3 = 78 张)
  const mobileUrls = [
    // --- 第一批 ---
    'https://imagecdn.madoka1003.org/Webp/102912132_p0.webp',    // 2591x3624
    'https://imagecdn.madoka1003.org/Webp/102912141_p0.webp',    // 1614x2258
    'https://imagecdn.madoka1003.org/Webp/102912160_p0.webp',    // 2591x3624
    'https://imagecdn.madoka1003.org/Webp/107465767_p0.webp',    // 1785x3500
    'https://imagecdn.madoka1003.org/Webp/137803884_p0.webp',    // 2160x3840
    'https://imagecdn.madoka1003.org/Webp/16903028_p0.webp',     // 1060x1300
    'https://imagecdn.madoka1003.org/Webp/19033617_p0.webp',     // 491x600
    'https://imagecdn.madoka1003.org/Webp/33842921925d32fca6d98f04ee0b444e2c9e971d.webp', // 2480x3507
    'https://imagecdn.madoka1003.org/Webp/40071493_p0.webp',     // 730x1032
    'https://imagecdn.madoka1003.org/Webp/48824031_p0.webp',     // 1000x1294
    'https://imagecdn.madoka1003.org/Webp/63071289_p0.webp',     // 2100x2700
    'https://imagecdn.madoka1003.org/Webp/84677079_p0.webp',     // 1200x1750
    'https://imagecdn.madoka1003.org/Webp/84843716_p0.webp',     // 2894x4093
    // --- 第二批 1-50 ---
    'https://imagecdn.madoka1003.org/Webp/2_p0.jpg',     // 1784x2048
    'https://imagecdn.madoka1003.org/Webp/3_p0.jpg',     // 826x1169
    'https://imagecdn.madoka1003.org/Webp/5_p0.jpg',     // 633x1214
    'https://imagecdn.madoka1003.org/Webp/7_p0.jpg',     // 1224x2017
    'https://imagecdn.madoka1003.org/Webp/9_p0.jpg',     // 1200x1800
    'https://imagecdn.madoka1003.org/Webp/11_p0.png',    // 1736x4900
    'https://imagecdn.madoka1003.org/Webp/15_p0.jpg',    // 1500x2000
    'https://imagecdn.madoka1003.org/Webp/16_p0.jpg',    // 1460x2132
    'https://imagecdn.madoka1003.org/Webp/18_p0.png',    // 2480x3508
    'https://imagecdn.madoka1003.org/Webp/22_p0.jpg',    // 3720x7525
    'https://imagecdn.madoka1003.org/Webp/23_p0.jpg',    // 833x1100
    'https://imagecdn.madoka1003.org/Webp/25_p0.jpg',    // 1001x1359
    'https://imagecdn.madoka1003.org/Webp/26_p0.png',    // 1520x2631
    'https://imagecdn.madoka1003.org/Webp/27_p0.jpg',    // 793x1269
    'https://imagecdn.madoka1003.org/Webp/29_p0.jpg',    // 3500x6067
    'https://imagecdn.madoka1003.org/Webp/32_p0.jpg',    // 706x977
    'https://imagecdn.madoka1003.org/Webp/36_p0.jpg',    // 2480x3508
    'https://imagecdn.madoka1003.org/Webp/37_p0.jpg',    // 2480x3508
    'https://imagecdn.madoka1003.org/Webp/39_p0.jpg',    // 2480x3508
    'https://imagecdn.madoka1003.org/Webp/40_p0.jpg',    // 2480x3508
    'https://imagecdn.madoka1003.org/Webp/41_p0.jpg',    // 1827x3000
    'https://imagecdn.madoka1003.org/Webp/42_p0.png',    // 3035x4299
    'https://imagecdn.madoka1003.org/Webp/44_p0.jpg',    // 1100x1467
    'https://imagecdn.madoka1003.org/Webp/46_p0.jpg',    // 1423x2000
    'https://imagecdn.madoka1003.org/Webp/47_p0.jpg',    // 3031x4706
    'https://imagecdn.madoka1003.org/Webp/49_p0.jpg',    // 1600x2000
    'https://imagecdn.madoka1003.org/Webp/50_p0.jpg',    // 1600x2000
    // --- 第三批 51-99 竖屏 ---
    'https://imagecdn.madoka1003.org/Webp/51_p0.jpg',    // 2823x4000
    'https://imagecdn.madoka1003.org/Webp/52_p0.jpg',    // 2814x4000
    'https://imagecdn.madoka1003.org/Webp/55_p0.jpg',    // 2830x4000
    'https://imagecdn.madoka1003.org/Webp/56_p0.jpg',    // 1920x3210
    'https://imagecdn.madoka1003.org/Webp/58_p0.jpg',    // 1240x1754
    'https://imagecdn.madoka1003.org/Webp/59_p0.jpg',    // 1400x2306
    'https://imagecdn.madoka1003.org/Webp/60_p0.jpg',    // 1232x1735
    'https://imagecdn.madoka1003.org/Webp/61_p0.jpg',    // 2412x3776
    'https://imagecdn.madoka1003.org/Webp/64_p0.jpg',    // 2834x4091
    'https://imagecdn.madoka1003.org/Webp/65_p0.jpg',    // 2705x4091
    'https://imagecdn.madoka1003.org/Webp/66_p0.jpg',    // 1300x1838
    'https://imagecdn.madoka1003.org/Webp/71_p0.jpg',    // 1000x2500
    'https://imagecdn.madoka1003.org/Webp/72_p0.jpg',    // 1000x1333
    'https://imagecdn.madoka1003.org/Webp/74_p0.jpg',    // 2876x4098
    'https://imagecdn.madoka1003.org/Webp/75_p0.jpg',    // 2871x4081
    'https://imagecdn.madoka1003.org/Webp/76_p0.jpg',    // 2873x4094
    'https://imagecdn.madoka1003.org/Webp/77_p0.jpg',    // 2874x4089
    'https://imagecdn.madoka1003.org/Webp/78_p0.jpg',    // 1095x1546
    'https://imagecdn.madoka1003.org/Webp/79_p0.jpg',    // 1415x2000
    'https://imagecdn.madoka1003.org/Webp/80_p0.jpg',    // 1412x2000
    'https://imagecdn.madoka1003.org/Webp/81_p0.jpg',    // 656x960
    'https://imagecdn.madoka1003.org/Webp/82_p0.jpg',    // 1200x1371
    'https://imagecdn.madoka1003.org/Webp/85_p0.jpg',    // 777x1100
    'https://imagecdn.madoka1003.org/Webp/86_p0.jpg',    // 1070x1500
    'https://imagecdn.madoka1003.org/Webp/90_p0.jpg',    // 860x1200
    'https://imagecdn.madoka1003.org/Webp/91_p0.jpg',    // 1016x1500
    'https://imagecdn.madoka1003.org/Webp/92_p0.jpg',    // 1062x1500
    'https://imagecdn.madoka1003.org/Webp/96_p0.jpg',    // 911x1280
    'https://imagecdn.madoka1003.org/Webp/99_p0.jpg',    // 1351x1909
    // --- 方形 (通用) ---
    'https://imagecdn.madoka1003.org/Webp/19004863_p0.webp',     // 596x600
    'https://imagecdn.madoka1003.org/Webp/6_p0.jpg',     // 571x571
    'https://imagecdn.madoka1003.org/Webp/12_p0.jpg',    // 2908x2946
    'https://imagecdn.madoka1003.org/Webp/17_p0.jpg',    // 1585x1585
    'https://imagecdn.madoka1003.org/Webp/28_p0.png',    // 2406x2654
    'https://imagecdn.madoka1003.org/Webp/43_p0.jpg',    // 2362x2257
    'https://imagecdn.madoka1003.org/Webp/67_p0.jpg',    // 1314x1400
    'https://imagecdn.madoka1003.org/Webp/69_p0.jpg',    // 1210x1300
    'https://imagecdn.madoka1003.org/Webp/89_p0.png',    // 1665x1800
  ];

  // 横屏图片 — 适合电脑端 (旧23 + 新18 + 方形5+1 + 新17 + 方形3 = 67 张)
  const desktopUrls = [
    // --- 第一批 ---
    'https://imagecdn.madoka1003.org/Webp/0d9efb5a2fca6440b7d7f348571b9d7bfc2644b2.webp',  // 1125x800
    'https://imagecdn.madoka1003.org/Webp/13bdfa7bcaad054e1d38fdf04cf1cc507a18b95c.webp',   // 1325x1028
    'https://imagecdn.madoka1003.org/Webp/20251023_000324-kkof.webp',                        // 1000x759
    'https://imagecdn.madoka1003.org/Webp/c8ae96107fbdc1d46993215d5c69902babb06aa7.webp',    // 1920x1080
    'https://imagecdn.madoka1003.org/Webp/background-4.webp',                                // 1920x1080
    'https://imagecdn.madoka1003.org/Webp/b52a2ae589530aa9c57e5b725b689c3420ff1e17.webp',    // 1920x1080
    'https://imagecdn.madoka1003.org/Webp/background-2.webp',                                // 1800x1273
    'https://imagecdn.madoka1003.org/Webp/133637578_p0.webp',                                // 7798x4386
    'https://imagecdn.madoka1003.org/Webp/17346892_p0.webp',                                 // 1100x799
    'https://imagecdn.madoka1003.org/Webp/38444556_p0.webp',                                 // 1500x900
    'https://imagecdn.madoka1003.org/Webp/39137791_p0.webp',                                 // 2929x2480
    'https://imagecdn.madoka1003.org/Webp/39874924_p0.webp',                                 // 1600x900
    'https://imagecdn.madoka1003.org/Webp/43674975_p0.webp',                                 // 1200x1023
    'https://imagecdn.madoka1003.org/Webp/48768083_p0.webp',                                 // 2274x1568
    'https://imagecdn.madoka1003.org/Webp/48824021_p0.webp',                                 // 1920x1080
    'https://imagecdn.madoka1003.org/Webp/48824034_p0.webp',                                 // 1920x1080
    'https://imagecdn.madoka1003.org/Webp/61330061_p0.webp',                                 // 2455x1200
    'https://imagecdn.madoka1003.org/Webp/68157365_p0.webp',                                 // 2400x2000
    'https://imagecdn.madoka1003.org/Webp/89942064_p0.webp',                                 // 1300x848
    'https://imagecdn.madoka1003.org/Webp/90829116_p0.webp',                                 // 2006x1128
    'https://imagecdn.madoka1003.org/Webp/91555761_p0.webp',                                 // 1600x1100
    'https://imagecdn.madoka1003.org/Webp/91842494_p0.webp',                                 // 4093x2894
    'https://imagecdn.madoka1003.org/Webp/99526666_p0.webp',                                 // 3508x2480
    // --- 第二批 1-50 ---
    'https://imagecdn.madoka1003.org/Webp/1_p0.jpg',     // 2224x1668
    'https://imagecdn.madoka1003.org/Webp/4_p0.jpg',     // 3717x2882
    'https://imagecdn.madoka1003.org/Webp/8_p0.png',     // 2636x2286
    'https://imagecdn.madoka1003.org/Webp/10_p0.png',    // 3846x2099
    'https://imagecdn.madoka1003.org/Webp/13_p0.jpg',    // 8000x4000
    'https://imagecdn.madoka1003.org/Webp/14_p0.png',    // 5172x2909
    'https://imagecdn.madoka1003.org/Webp/19_p0.png',    // 2048x1152
    'https://imagecdn.madoka1003.org/Webp/20_p0.png',    // 3979x3387
    'https://imagecdn.madoka1003.org/Webp/21_p0.jpg',    // 1166x666
    'https://imagecdn.madoka1003.org/Webp/24_p0.jpg',    // 1638x1279
    'https://imagecdn.madoka1003.org/Webp/30_p0.jpg',    // 1621x1378
    'https://imagecdn.madoka1003.org/Webp/31_p0.jpg',    // 806x563
    'https://imagecdn.madoka1003.org/Webp/33_p0.png',    // 3104x1376
    'https://imagecdn.madoka1003.org/Webp/34_p0.jpg',    // 7680x4320
    'https://imagecdn.madoka1003.org/Webp/35_p0.png',    // 2108x1200
    'https://imagecdn.madoka1003.org/Webp/38_p0.png',    // 1600x900
    'https://imagecdn.madoka1003.org/Webp/45_p0.png',    // 2039x1378
    'https://imagecdn.madoka1003.org/Webp/48_p0.jpg',    // 3844x2894
    // --- 第三批 51-99 横屏 ---
    'https://imagecdn.madoka1003.org/Webp/53_p0.png',    // 933x761
    'https://imagecdn.madoka1003.org/Webp/54_p0.jpg',    // 700x493
    'https://imagecdn.madoka1003.org/Webp/57_p0.png',    // 1536x451 横幅
    'https://imagecdn.madoka1003.org/Webp/62_p0.jpg',    // 5262x3174
    'https://imagecdn.madoka1003.org/Webp/63_p0.jpg',    // 2851x837 横幅
    'https://imagecdn.madoka1003.org/Webp/68_p0.jpg',    // 1190x784
    'https://imagecdn.madoka1003.org/Webp/70_p0.jpg',    // 1150x793
    'https://imagecdn.madoka1003.org/Webp/73_p0.jpg',    // 840x525
    'https://imagecdn.madoka1003.org/Webp/83_p0.jpg',    // 2048x1536
    'https://imagecdn.madoka1003.org/Webp/84_p0.jpg',    // 1920x1080
    'https://imagecdn.madoka1003.org/Webp/87_p0.jpg',    // 1807x531 横幅
    'https://imagecdn.madoka1003.org/Webp/88_p0.png',    // 1568x1104
    'https://imagecdn.madoka1003.org/Webp/93_p0.jpg',    // 950x570
    'https://imagecdn.madoka1003.org/Webp/94_p0.jpg',    // 950x672
    'https://imagecdn.madoka1003.org/Webp/95_p0.jpg',    // 950x594
    'https://imagecdn.madoka1003.org/Webp/97_p0.jpg',    // 1278x798
    'https://imagecdn.madoka1003.org/Webp/98_p0.jpg',    // 950x672
    // --- 方形 (通用) ---
    'https://imagecdn.madoka1003.org/Webp/19004863_p0.webp',     // 596x600
    'https://imagecdn.madoka1003.org/Webp/6_p0.jpg',     // 571x571
    'https://imagecdn.madoka1003.org/Webp/12_p0.jpg',    // 2908x2946
    'https://imagecdn.madoka1003.org/Webp/17_p0.jpg',    // 1585x1585
    'https://imagecdn.madoka1003.org/Webp/28_p0.png',    // 2406x2654
    'https://imagecdn.madoka1003.org/Webp/43_p0.jpg',    // 2362x2257
    'https://imagecdn.madoka1003.org/Webp/67_p0.jpg',    // 1314x1400
    'https://imagecdn.madoka1003.org/Webp/69_p0.jpg',    // 1210x1300
    'https://imagecdn.madoka1003.org/Webp/89_p0.png',    // 1665x1800
  ];

  const urls = isMobile ? mobileUrls : desktopUrls;
  const index = Math.floor(Math.random() * urls.length);

  return Response.redirect(urls[index], 302);
};
