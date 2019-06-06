<template>
  <div class="header">
    <div class="wrap">
      <ui-row>
        <ui-col :span="19" class="header--brand brand">
          <span class="brand--icon">
            <svg width="60" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="21.416" y="2.591" width="10.459" height="30.578" rx="5.23" fill="#00E8FF"/><rect x="40.558" y="2.542" width="10.556" height="31.22" rx="5.278" fill="#00E8FF"/><rect width="10.773" height="38.434" rx="5.386" transform="matrix(.69267 .72125 -.69313 .72081 26.64 0)" fill="url(#paint0_linear)"/><rect width="10.773" height="38.981" rx="5.386" transform="matrix(.69267 .72125 -.69313 .72081 46.064 0)" fill="url(#paint1_linear)"/><rect width="10.773" height="20.47" rx="5.386" transform="matrix(.69267 .72125 -.69313 .72081 52.538 13.475)" fill="url(#paint2_linear)"/><defs><linearGradient id="paint0_linear" x1="5.386" y1="0" x2="5.386" y2="38.434" gradientUnits="userSpaceOnUse"><stop stop-color="#1C9AF5"/><stop offset="1" stop-color="#00E8FF"/></linearGradient><linearGradient id="paint1_linear" x1="5.386" y1="0" x2="5.386" y2="38.981" gradientUnits="userSpaceOnUse"><stop stop-color="#1C9AF5"/><stop offset="1" stop-color="#00E8FF"/></linearGradient><linearGradient id="paint2_linear" x1="5.386" y1="0" x2="5.386" y2="20.47" gradientUnits="userSpaceOnUse"><stop stop-color="#1C9AF5"/><stop offset="1" stop-color="#00E7FF"/></linearGradient></defs></svg>
          </span>
          <span class="brand--title">Калькулятор Мартингейла</span>
        </ui-col>
        <ui-col :span="5">
            <div class="header--nav">
                <a href="https://github.com/YuraDev/calc" target="_blank">
                    <svg id="icon-github" viewBox="0 0 64 64" width="36" height="36">
                        <path
                        stroke-width="0"
                        fill="black"
                        d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"
                        ></path>
                    </svg>
                </a>
            </div>
        </ui-col>
      </ui-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>