<script setup lang="ts">
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import banner1 from "@/assets/1.png";
import banner2 from "@/assets/2.png";
import banner3 from "@/assets/3.png";
defineOptions({
  name: "index"
});

SwiperCore.use([Autoplay, Navigation, Pagination]);

const swiperExample: any[] = [
  {
    id: 1,
    label: "按钮切换",
    options: {
      navigation: true
    }
  }
];
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div>社区安全宣传海报</div>
    </template>
    <el-row :gutter="10">
      <el-col v-for="item in swiperExample" :key="item.id" :span="24">
        <swiper v-bind="item.options">
          <swiper-slide>
            <div
              class="banner flex justify-center items-center h-[240px] border border-[#999]"
            >
              <img :src="banner1" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="banner flex justify-center items-center h-[240px] border border-[#999]"
            >
              <img :src="banner2" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="banner flex justify-center items-center h-[240px] border border-[#999]"
            >
              <img :src="banner3" />
            </div>
          </swiper-slide>
        </swiper>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  padding-top: 0;
}
.banner {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
