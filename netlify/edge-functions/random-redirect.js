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
    'https://wpapi.lwzmc1437.cn/Webp/102912132_p0.webp',    // 2591x3624
    'https://wpapi.lwzmc1437.cn/Webp/102912141_p0.webp',    // 1614x2258
    'https://wpapi.lwzmc1437.cn/Webp/102912160_p0.webp',    // 2591x3624
    'https://wpapi.lwzmc1437.cn/Webp/107465767_p0.webp',    // 1785x3500
    'https://wpapi.lwzmc1437.cn/Webp/137803884_p0.webp',    // 2160x3840
    'https://wpapi.lwzmc1437.cn/Webp/16903028_p0.webp',     // 1060x1300
    'https://wpapi.lwzmc1437.cn/Webp/19033617_p0.webp',     // 491x600
    'https://wpapi.lwzmc1437.cn/Webp/33842921925d32fca6d98f04ee0b444e2c9e971d.webp', // 2480x3507
    'https://wpapi.lwzmc1437.cn/Webp/40071493_p0.webp',     // 730x1032
    'https://wpapi.lwzmc1437.cn/Webp/48824031_p0.webp',     // 1000x1294
    'https://wpapi.lwzmc1437.cn/Webp/63071289_p0.webp',     // 2100x2700
    'https://wpapi.lwzmc1437.cn/Webp/84677079_p0.webp',     // 1200x1750
    'https://wpapi.lwzmc1437.cn/Webp/84843716_p0.webp',     // 2894x4093
    // --- 第二批 1-50 ---
    'https://wpapi.lwzmc1437.cn/Webp/2_p0.jpg',     // 1784x2048
    'https://wpapi.lwzmc1437.cn/Webp/3_p0.jpg',     // 826x1169
    'https://wpapi.lwzmc1437.cn/Webp/5_p0.jpg',     // 633x1214
    'https://wpapi.lwzmc1437.cn/Webp/7_p0.jpg',     // 1224x2017
    'https://wpapi.lwzmc1437.cn/Webp/9_p0.jpg',     // 1200x1800
    'https://wpapi.lwzmc1437.cn/Webp/11_p0.png',    // 1736x4900
    'https://wpapi.lwzmc1437.cn/Webp/15_p0.jpg',    // 1500x2000
    'https://wpapi.lwzmc1437.cn/Webp/16_p0.jpg',    // 1460x2132
    'https://wpapi.lwzmc1437.cn/Webp/18_p0.png',    // 2480x3508
    'https://wpapi.lwzmc1437.cn/Webp/22_p0.jpg',    // 3720x7525
    'https://wpapi.lwzmc1437.cn/Webp/23_p0.jpg',    // 833x1100
    'https://wpapi.lwzmc1437.cn/Webp/25_p0.jpg',    // 1001x1359
    'https://wpapi.lwzmc1437.cn/Webp/26_p0.png',    // 1520x2631
    'https://wpapi.lwzmc1437.cn/Webp/27_p0.jpg',    // 793x1269
    'https://wpapi.lwzmc1437.cn/Webp/29_p0.jpg',    // 3500x6067
    'https://wpapi.lwzmc1437.cn/Webp/32_p0.jpg',    // 706x977
    'https://wpapi.lwzmc1437.cn/Webp/36_p0.jpg',    // 2480x3508
    'https://wpapi.lwzmc1437.cn/Webp/37_p0.jpg',    // 2480x3508
    'https://wpapi.lwzmc1437.cn/Webp/39_p0.jpg',    // 2480x3508
    'https://wpapi.lwzmc1437.cn/Webp/40_p0.jpg',    // 2480x3508
    'https://wpapi.lwzmc1437.cn/Webp/41_p0.jpg',    // 1827x3000
    'https://wpapi.lwzmc1437.cn/Webp/42_p0.png',    // 3035x4299
    'https://wpapi.lwzmc1437.cn/Webp/44_p0.jpg',    // 1100x1467
    'https://wpapi.lwzmc1437.cn/Webp/46_p0.jpg',    // 1423x2000
    'https://wpapi.lwzmc1437.cn/Webp/47_p0.jpg',    // 3031x4706
    'https://wpapi.lwzmc1437.cn/Webp/49_p0.jpg',    // 1600x2000
    'https://wpapi.lwzmc1437.cn/Webp/50_p0.jpg',    // 1600x2000
    // --- 第三批 51-99 竖屏 ---
    'https://wpapi.lwzmc1437.cn/Webp/51_p0.jpg',    // 2823x4000
    'https://wpapi.lwzmc1437.cn/Webp/52_p0.jpg',    // 2814x4000
    'https://wpapi.lwzmc1437.cn/Webp/55_p0.jpg',    // 2830x4000
    'https://wpapi.lwzmc1437.cn/Webp/56_p0.jpg',    // 1920x3210
    'https://wpapi.lwzmc1437.cn/Webp/58_p0.jpg',    // 1240x1754
    'https://wpapi.lwzmc1437.cn/Webp/59_p0.jpg',    // 1400x2306
    'https://wpapi.lwzmc1437.cn/Webp/60_p0.jpg',    // 1232x1735
    'https://wpapi.lwzmc1437.cn/Webp/61_p0.jpg',    // 2412x3776
    'https://wpapi.lwzmc1437.cn/Webp/64_p0.jpg',    // 2834x4091
    'https://wpapi.lwzmc1437.cn/Webp/65_p0.jpg',    // 2705x4091
    'https://wpapi.lwzmc1437.cn/Webp/66_p0.jpg',    // 1300x1838
    'https://wpapi.lwzmc1437.cn/Webp/71_p0.jpg',    // 1000x2500
    'https://wpapi.lwzmc1437.cn/Webp/72_p0.jpg',    // 1000x1333
    'https://wpapi.lwzmc1437.cn/Webp/74_p0.jpg',    // 2876x4098
    'https://wpapi.lwzmc1437.cn/Webp/75_p0.jpg',    // 2871x4081
    'https://wpapi.lwzmc1437.cn/Webp/76_p0.jpg',    // 2873x4094
    'https://wpapi.lwzmc1437.cn/Webp/77_p0.jpg',    // 2874x4089
    'https://wpapi.lwzmc1437.cn/Webp/78_p0.jpg',    // 1095x1546
    'https://wpapi.lwzmc1437.cn/Webp/79_p0.jpg',    // 1415x2000
    'https://wpapi.lwzmc1437.cn/Webp/80_p0.jpg',    // 1412x2000
    'https://wpapi.lwzmc1437.cn/Webp/81_p0.jpg',    // 656x960
    'https://wpapi.lwzmc1437.cn/Webp/82_p0.jpg',    // 1200x1371
    'https://wpapi.lwzmc1437.cn/Webp/85_p0.jpg',    // 777x1100
    'https://wpapi.lwzmc1437.cn/Webp/86_p0.jpg',    // 1070x1500
    'https://wpapi.lwzmc1437.cn/Webp/90_p0.jpg',    // 860x1200
    'https://wpapi.lwzmc1437.cn/Webp/91_p0.jpg',    // 1016x1500
    'https://wpapi.lwzmc1437.cn/Webp/92_p0.jpg',    // 1062x1500
    'https://wpapi.lwzmc1437.cn/Webp/96_p0.jpg',    // 911x1280
    'https://wpapi.lwzmc1437.cn/Webp/99_p0.jpg',    // 1351x1909
    // --- 方形 (通用) ---
    'https://wpapi.lwzmc1437.cn/Webp/19004863_p0.webp',     // 596x600
    'https://wpapi.lwzmc1437.cn/Webp/6_p0.jpg',     // 571x571
    'https://wpapi.lwzmc1437.cn/Webp/12_p0.jpg',    // 2908x2946
    'https://wpapi.lwzmc1437.cn/Webp/17_p0.jpg',    // 1585x1585
    'https://wpapi.lwzmc1437.cn/Webp/28_p0.png',    // 2406x2654
    'https://wpapi.lwzmc1437.cn/Webp/43_p0.jpg',    // 2362x2257
    'https://wpapi.lwzmc1437.cn/Webp/67_p0.jpg',    // 1314x1400
    'https://wpapi.lwzmc1437.cn/Webp/69_p0.jpg',    // 1210x1300
    'https://wpapi.lwzmc1437.cn/Webp/89_p0.png',    // 1665x1800
  ];

  // 横屏图片 — 适合电脑端 (旧23 + 新18 + 方形5+1 + 新17 + 方形3 = 67 张)
  const desktopUrls = [
    // --- 第一批 ---
    'https://wpapi.lwzmc1437.cn/Webp/0d9efb5a2fca6440b7d7f348571b9d7bfc2644b2.webp',  // 1125x800
    'https://wpapi.lwzmc1437.cn/Webp/13bdfa7bcaad054e1d38fdf04cf1cc507a18b95c.webp',   // 1325x1028
    'https://wpapi.lwzmc1437.cn/Webp/20251023_000324-kkof.webp',                        // 1000x759
    'https://wpapi.lwzmc1437.cn/Webp/c8ae96107fbdc1d46993215d5c69902babb06aa7.webp',    // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/background-4.webp',                                // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/b52a2ae589530aa9c57e5b725b689c3420ff1e17.webp',    // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/background-2.webp',                                // 1800x1273
    'https://wpapi.lwzmc1437.cn/Webp/133637578_p0.webp',                                // 7798x4386
    'https://wpapi.lwzmc1437.cn/Webp/17346892_p0.webp',                                 // 1100x799
    'https://wpapi.lwzmc1437.cn/Webp/38444556_p0.webp',                                 // 1500x900
    'https://wpapi.lwzmc1437.cn/Webp/39137791_p0.webp',                                 // 2929x2480
    'https://wpapi.lwzmc1437.cn/Webp/39874924_p0.webp',                                 // 1600x900
    'https://wpapi.lwzmc1437.cn/Webp/43674975_p0.webp',                                 // 1200x1023
    'https://wpapi.lwzmc1437.cn/Webp/48768083_p0.webp',                                 // 2274x1568
    'https://wpapi.lwzmc1437.cn/Webp/48824021_p0.webp',                                 // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/48824034_p0.webp',                                 // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/61330061_p0.webp',                                 // 2455x1200
    'https://wpapi.lwzmc1437.cn/Webp/68157365_p0.webp',                                 // 2400x2000
    'https://wpapi.lwzmc1437.cn/Webp/89942064_p0.webp',                                 // 1300x848
    'https://wpapi.lwzmc1437.cn/Webp/90829116_p0.webp',                                 // 2006x1128
    'https://wpapi.lwzmc1437.cn/Webp/91555761_p0.webp',                                 // 1600x1100
    'https://wpapi.lwzmc1437.cn/Webp/91842494_p0.webp',                                 // 4093x2894
    'https://wpapi.lwzmc1437.cn/Webp/99526666_p0.webp',                                 // 3508x2480
    // --- 第二批 1-50 ---
    'https://wpapi.lwzmc1437.cn/Webp/1_p0.jpg',     // 2224x1668
    'https://wpapi.lwzmc1437.cn/Webp/4_p0.jpg',     // 3717x2882
    'https://wpapi.lwzmc1437.cn/Webp/8_p0.png',     // 2636x2286
    'https://wpapi.lwzmc1437.cn/Webp/10_p0.png',    // 3846x2099
    'https://wpapi.lwzmc1437.cn/Webp/13_p0.jpg',    // 8000x4000
    'https://wpapi.lwzmc1437.cn/Webp/14_p0.png',    // 5172x2909
    'https://wpapi.lwzmc1437.cn/Webp/19_p0.png',    // 2048x1152
    'https://wpapi.lwzmc1437.cn/Webp/20_p0.png',    // 3979x3387
    'https://wpapi.lwzmc1437.cn/Webp/21_p0.jpg',    // 1166x666
    'https://wpapi.lwzmc1437.cn/Webp/24_p0.jpg',    // 1638x1279
    'https://wpapi.lwzmc1437.cn/Webp/30_p0.jpg',    // 1621x1378
    'https://wpapi.lwzmc1437.cn/Webp/31_p0.jpg',    // 806x563
    'https://wpapi.lwzmc1437.cn/Webp/33_p0.png',    // 3104x1376
    'https://wpapi.lwzmc1437.cn/Webp/34_p0.jpg',    // 7680x4320
    'https://wpapi.lwzmc1437.cn/Webp/35_p0.png',    // 2108x1200
    'https://wpapi.lwzmc1437.cn/Webp/38_p0.png',    // 1600x900
    'https://wpapi.lwzmc1437.cn/Webp/45_p0.png',    // 2039x1378
    'https://wpapi.lwzmc1437.cn/Webp/48_p0.jpg',    // 3844x2894
    // --- 第三批 51-99 横屏 ---
    'https://wpapi.lwzmc1437.cn/Webp/53_p0.png',    // 933x761
    'https://wpapi.lwzmc1437.cn/Webp/54_p0.jpg',    // 700x493
    'https://wpapi.lwzmc1437.cn/Webp/57_p0.png',    // 1536x451 横幅
    'https://wpapi.lwzmc1437.cn/Webp/62_p0.jpg',    // 5262x3174
    'https://wpapi.lwzmc1437.cn/Webp/63_p0.jpg',    // 2851x837 横幅
    'https://wpapi.lwzmc1437.cn/Webp/68_p0.jpg',    // 1190x784
    'https://wpapi.lwzmc1437.cn/Webp/70_p0.jpg',    // 1150x793
    'https://wpapi.lwzmc1437.cn/Webp/73_p0.jpg',    // 840x525
    'https://wpapi.lwzmc1437.cn/Webp/83_p0.jpg',    // 2048x1536
    'https://wpapi.lwzmc1437.cn/Webp/84_p0.jpg',    // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/87_p0.jpg',    // 1807x531 横幅
    'https://wpapi.lwzmc1437.cn/Webp/88_p0.png',    // 1568x1104
    'https://wpapi.lwzmc1437.cn/Webp/93_p0.jpg',    // 950x570
    'https://wpapi.lwzmc1437.cn/Webp/94_p0.jpg',    // 950x672
    'https://wpapi.lwzmc1437.cn/Webp/95_p0.jpg',    // 950x594
    'https://wpapi.lwzmc1437.cn/Webp/97_p0.jpg',    // 1278x798
    'https://wpapi.lwzmc1437.cn/Webp/98_p0.jpg',    // 950x672
    // --- 方形 (通用) ---
    'https://wpapi.lwzmc1437.cn/Webp/19004863_p0.webp',     // 596x600
    'https://wpapi.lwzmc1437.cn/Webp/6_p0.jpg',     // 571x571
    'https://wpapi.lwzmc1437.cn/Webp/12_p0.jpg',    // 2908x2946
    'https://wpapi.lwzmc1437.cn/Webp/17_p0.jpg',    // 1585x1585
    'https://wpapi.lwzmc1437.cn/Webp/28_p0.png',    // 2406x2654
    'https://wpapi.lwzmc1437.cn/Webp/43_p0.jpg',    // 2362x2257
    'https://wpapi.lwzmc1437.cn/Webp/67_p0.jpg',    // 1314x1400
    'https://wpapi.lwzmc1437.cn/Webp/69_p0.jpg',    // 1210x1300
    'https://wpapi.lwzmc1437.cn/Webp/89_p0.png',    // 1665x1800
  ];

  const urls = isMobile ? mobileUrls : desktopUrls;
  const index = Math.floor(Math.random() * urls.length);

  return Response.redirect(urls[index], 302);
};
