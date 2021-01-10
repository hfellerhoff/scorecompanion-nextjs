import { useColorMode } from '@chakra-ui/react';
import React from 'react';

interface Props {}

const Logo = (props: Props) => {
  const { colorMode } = useColorMode();

  // 1.119483315
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='40.000000pt'
      height='40.000000pt'
      viewBox='0 0 40.000000 40.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <g
        transform='translate(0.000000,40.000000) scale(0.100000,-0.100000)'
        fill={colorMode === 'light' ? '#242425' : 'white'}
        stroke='none'
      >
        <path
          d='M9006 9265 c-140 -36 -326 -151 -435 -271 -199 -217 -311 -525 -311
-854 0 -103 10 -197 55 -495 30 -201 55 -372 55 -379 0 -7 -60 -50 -132 -97
-680 -432 -1152 -1044 -1312 -1700 -74 -304 -81 -654 -20 -959 75 -375 260
-703 517 -918 276 -231 592 -365 1007 -427 113 -17 419 -34 492 -27 44 4 46 3
52 -25 3 -15 45 -305 92 -643 86 -604 87 -619 88 -815 0 -171 -3 -215 -23
-305 -77 -359 -280 -589 -625 -709 -149 -52 -226 -61 -546 -61 l-288 0 -6 23
c-3 12 -6 47 -6 78 0 78 -27 359 -51 524 -80 563 -229 1055 -460 1515 -270
537 -621 971 -1089 1345 -107 86 -421 297 -549 370 -207 117 -501 250 -769
348 l-63 23 348 113 c191 62 350 114 352 116 5 6 -81 393 -154 690 -270 1099
-567 1936 -826 2331 -185 281 -438 449 -792 526 -89 20 -132 22 -342 23 -186
0 -265 -4 -350 -18 -268 -44 -453 -106 -566 -188 -26 -19 -186 -170 -356 -336
-288 -280 -314 -302 -363 -317 -47 -14 -151 -16 -835 -16 l-782 0 -6 -177
c-15 -424 50 -758 197 -1016 213 -373 546 -609 1001 -711 179 -40 192 -44 223
-71 65 -54 65 -57 73 -530 l7 -430 -70 -160 c-242 -551 -380 -985 -434 -1370
-22 -159 -22 -405 0 -550 56 -359 158 -622 377 -975 124 -200 146 -246 154
-331 12 -110 -24 -428 -78 -709 l-22 -115 -318 -3 -317 -2 0 -290 0 -290 548
2 547 3 37 150 c133 536 204 1061 179 1321 -18 186 -68 308 -230 562 -191 299
-278 535 -311 838 -34 314 107 863 373 1461 l52 118 785 3 c828 3 848 3 1095
-44 703 -134 1338 -417 1845 -822 211 -170 475 -449 637 -677 295 -414 513
-935 626 -1495 70 -348 97 -620 105 -1065 l7 -350 630 0 c615 0 633 1 742 23
62 12 164 40 228 63 671 231 1045 789 1045 1558 0 167 -11 264 -108 961 l-88
625 121 60 c158 79 260 150 370 260 172 170 283 378 332 622 27 134 24 412 -5
560 -80 401 -274 683 -597 868 -138 79 -363 152 -522 170 -59 6 -61 8 -67 38
-3 18 -44 290 -91 605 l-85 574 27 21 c175 137 403 355 510 488 282 349 404
693 349 983 -42 218 -153 452 -280 593 -60 67 -175 144 -257 173 -83 29 -256
36 -343 15z m185 -602 c67 -77 136 -273 124 -357 -20 -154 -159 -379 -349
-565 -45 -44 -67 -60 -70 -50 -2 8 -17 97 -31 199 -41 279 -28 423 51 585 19
39 55 92 81 119 46 49 127 106 149 106 7 0 27 -17 45 -37z m-5741 -643 c148
-24 279 -83 364 -165 225 -216 521 -993 812 -2133 42 -162 74 -295 72 -297 -7
-7 -902 -294 -906 -290 -2 2 -51 223 -108 491 -57 268 -105 488 -107 490 -2 2
-560 -116 -564 -120 -1 -1 43 -211 98 -466 54 -256 99 -471 99 -478 0 -10
-116 -12 -562 -10 l-563 3 -6 335 c-7 351 -13 402 -59 521 -60 153 -203 312
-347 386 -94 49 -149 67 -268 89 -168 30 -334 95 -453 176 -73 49 -175 158
-221 235 -46 78 -96 206 -115 299 l-13 63 541 3 c523 4 544 5 621 26 202 56
269 106 625 458 162 160 309 298 325 306 36 19 186 54 304 73 104 16 342 19
431 5z m5020 -1407 c0 -10 130 -884 134 -905 3 -13 -16 -28 -73 -59 -326 -179
-516 -399 -597 -695 -22 -82 -30 -285 -14 -382 13 -81 56 -242 68 -254 12 -12
537 196 535 213 0 8 -9 43 -18 79 -41 154 -1 285 123 401 35 33 66 59 67 57
12 -12 196 -1341 187 -1349 -11 -11 -282 7 -397 25 -181 30 -321 74 -468 147
-110 56 -159 90 -246 173 -164 158 -260 351 -305 616 -82 485 62 969 421 1415
106 132 323 341 459 443 104 78 124 91 124 75z m907 -1468 c95 -34 168 -82
243 -162 129 -135 184 -298 184 -543 0 -130 -3 -153 -27 -225 -14 -44 -40
-102 -58 -130 -41 -66 -130 -157 -201 -206 l-57 -39 -6 32 c-3 18 -32 229 -65
468 -65 474 -108 769 -116 813 -7 33 -11 33 103 -8z'
        />
        <path
          d='M2547 7310 c-164 -41 -259 -203 -213 -363 35 -121 147 -207 268 -207
80 0 126 15 184 59 133 101 151 294 39 419 -69 77 -184 115 -278 92z'
        />
        <path
          d='M4272 1908 c-83 -148 -121 -299 -129 -509 -9 -237 23 -439 107 -692
22 -65 40 -121 40 -123 0 -2 -126 -4 -280 -4 l-280 0 0 -290 0 -290 770 0
c424 0 770 2 770 5 0 3 -67 115 -149 249 -161 263 -198 330 -260 479 -151 363
-183 686 -87 875 l24 48 -238 152 c-132 84 -243 152 -249 152 -5 0 -23 -24
-39 -52z'
        />
      </g>
    </svg>
  );
};

export default Logo;