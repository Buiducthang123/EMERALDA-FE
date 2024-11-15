<template>
    <div>
        <section
            class="flex items-center p-6 bg-[url('https://png.pngtree.com/background/20210711/original/pngtree-black-atmosphere-hotel-voucher-picture-image_1080430.jpg')] bg-no-repeat bg-cover h-80">
            <div class="h-fit w-full my-auto flex justify-between items-center text-white">
                <div>
                    <h1 class=" font-mono text-5xl font-bold">EMERALDA BLOG</h1>
                    <span>Khuyến mãi, thông tin du lịch Ninh Bình, tin tức từ khách sạn ...</span>
                </div>

                <div>
                    <span>Home</span>
                    <span> | </span>
                    <span>Tin tức</span>
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 p-10 gap-14">
            <div class="col-span-8 space-y-12">
                <div v-for="(item, index) in dummyBlog ">
                    <Blog :img="item.img" :content="item.content" />
                </div>
                <button class="bg-secondary text-white py-3 w-full text-base font-medium cursor-pointer">Xem thêm</button>
            </div>
            <div class="col-span-4 space-y-10">
                <div class="">
                    <h6 class="mb-6 text-xl font-medium">Search</h6>
                    <a-input-search placeholder="Search" size="large" />
                </div>

                <div>
                    <h6 class="mb-6 text-xl font-medium">Recent Posts</h6>
                    <div class="space-y-4">
                        <div class="py-2 border-b cursor-pointer" v-for="(item, index) in dummyRecentPosts"
                            :key="index">
                            <Icon name="i-solar-alt-arrow-right-outline" />
                            <span class="ml-2">{{ item.title }}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h6 class="mb-6 text-xl font-medium">Archives</h6>
                    <div class="space-y-4">
                        <div class="py-2 border-b cursor-pointer" v-for="(item, index) in dummyArchives" :key="index">
                            <Icon name="i-solar-alt-arrow-right-outline" />
                            <span class="ml-2">{{ item.month }} {{ item.year }}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h6 class="mb-6 text-xl font-medium">Categories</h6>
                    <div class="space-y-4">
                        <div class="py-2 border-b cursor-pointer" v-for="(item, index) in dummyCategories" :key="index">
                            <Icon name="i-solar-alt-arrow-right-outline" />
                            <span class="ml-2">{{ item.title }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Blog -  Emeralda Resort ',
    description: 'Emeralda Resort  - Tam cốc',
})
const dummyBlog = [
    {
        img: 'https://incucdep.com/wp-content/uploads/2019/01/mau-voucher-khach-san4.jpg',
        content: {
            title: 'Trọn Vẹn Yêu Thương: Gói Tiệc cưới từ 250.000 VNĐ/khách',
            description: 'Đêm nhạc Bolero - Nơi gặp gỡ của những tâm hồn lãng mạn, hoài niệm sẽ đưa những trái tim đồng điệu xích lại gần nhau hơn bằng những ca khúc trữ tình da diết cùng nhiều tuyệt phẩm Bolero chạm cảm xúc.',
            author: 'Emeralda Resort',
            date: '30/4/2022',
            comments: 0
        }
    },
    {
        img: 'https://invietnhat.vn/wp-content/uploads/2023/08/voucher-khach-san-dep.jpg',
        content: {
            title: 'Trung thu rộn ràng, thăng hoa vị giác',
            description: 'Đêm nhạc Bolero - Nơi gặp gỡ của những tâm hồn lãng mạn, hoài niệm sẽ đưa những trái tim đồng điệu xích lại gần nhau hơn bằng những ca khúc trữ tình da diết cùng nhiều tuyệt phẩm Bolero chạm cảm xúc.',
            author: 'Emeralda Resort',
            date: '30/4/2022',
            comments: 0
        }
    },
    {
        img: 'https://promacprinting.com/wp-content/uploads/2023/04/voucher-khach-san.jpg',
        content: {
            title: 'Đêm nhạc “Có hẹn với mùa thu” tại The Reed Hotel Ninh Bình vào 27/08!',
            description: 'Đêm nhạc Bolero - Nơi gặp gỡ của những tâm hồn lãng mạn, hoài niệm sẽ đưa những trái tim đồng điệu xích lại gần nhau hơn bằng những ca khúc trữ tình da diết cùng nhiều tuyệt phẩm Bolero chạm cảm xúc.',
            author: 'Emeralda Resort',
            date: '30/4/2022',
            comments: 0
        }
    },
    {
        img: 'https://thereedhotel.com/wp-content/uploads/2023/04/combo-khach-san-the-reed-ninh-binh-spa-320x202.jpeg',
        content: {
            title: 'Thông báo về hoạt động của Sen Spa',
            description: 'Kính gửi quý khách hàng thân mến, Chúng tôi xin trân trọng thông báo rằng dịch vụ tại Sen Spa của khách sạn',
            author: 'Emeralda Resort',
            date: '30/4/2022',
            comments: 0
        }
    },
    {
        img: 'https://thereedhotel.com/wp-content/uploads/2022/08/The-Reed_Hen-ho-voi-mua-Thu-03-320x202.jpg',
        content: {
            title: 'Đêm nhạc “Có hẹn với mùa thu” tại The Reed Hotel Ninh Bình vào 27/08!',
            description: 'Đêm nhạc Bolero - Nơi gặp gỡ của những tâm hồn lãng mạn, hoài niệm sẽ đưa những trái tim đồng điệu xích lại gần nhau hơn bằng những ca khúc trữ tình da diết cùng nhiều tuyệt phẩm Bolero chạm cảm xúc.',
            author: 'Emeralda Resort',
            date: '30/4/2022',
            comments: 0
        }
    },
    {
        img: 'https://thereedhotel.com/wp-content/uploads/2022/06/FB-cover-320x202.jpeg',
        content: {
            title: 'Đêm nhạc Bolero “Gõ cửa trái tim” tại The Reed Hotel Ninh Bình vào 3/7',
            description: 'Đêm nhạc Bolero - Nơi gặp gỡ của những tâm hồn lãng mạn, hoài niệm sẽ đưa những trái tim đồng điệu xích lại gần nhau hơn bằng những ca khúc trữ tình da diết cùng nhiều tuyệt phẩm Bolero chạm cảm xúc.',
            author: 'Emeralda Resort',
            date: '30/4/2022',
            comments: 0
        }
    },
    {
        img: 'https://thereedhotel.com/wp-content/uploads/2021/10/z2836374774693_6e3edd642e27c5e0ec020368d3ab660d-400x252.jpg',
        content: {
            title: 'Phòng họp miễn phí, sự kiện như ý',
            description: 'Với vị trí trung tâm tại Ninh Bình, cơ sở vật chất hiện đại với nhiều phòng họp với diện tích lớn nhỏ khác nhau và kinh nghiệm tổ chức những sự kiện lớn nhỏ trong nước và quốc tế, The Reed Hotel là lựa chọn hoàn hảo cho quý khách.',
            author: 'Emeralda Resort',
            date: '30/4/2022',
            comments: 0
        }
    },
]

const dummyRecentPosts = [
    {
        title: 'Trọn Vẹn Yêu Thương: Gói Tiệc cưới từ 250.000 VNĐ/khách',
    },
    {
        title: 'Thông báo về hoạt động của Sen Spa',
    },
    {
        title: 'Trung thu rộn ràng, thăng hoa vị giác',
    },
    {
        title: "Đêm nhạc “Có hẹn với mùa thu” tại The Reed Hotel Ninh Bình vào 27/08!"
    }

]

const dummyArchives = [
    {
        month: 'Tháng 12',
        year: '2024'
    },
    {
        month: 'Tháng 11',
        year: '2024'
    },
    {
        month: 'Tháng 10',
        year: '2024'
    },
    {
        month: 'Tháng 9',
        year: '2024'
    },
    {
        month: 'Tháng 8',
        year: '2024'
    },
    {
        month: 'Tháng 7',
        year: '2024'
    },
    {
        month: 'Tháng 6',
        year: '2024'
    },
    {
        month: 'Tháng 5',
        year: '2024'
    },
    {
        month: 'Tháng 4',
        year: '2024'
    },
    {
        month: 'Tháng 3',
        year: '2024'
    },
    {
        month: 'Tháng 2',
        year: '2024'
    },
    {
        month: 'Tháng 1',
        year: '2024'
    },
    {
        month: 'Tháng 10',
        year: '2024'
    },
    {
        month: 'Tháng 9',
        year: '2024'
    },
    {
        month: 'Tháng 8',
        year: '2024'
    },
    {
        month: 'Tháng 7',
        year: '2024'
    },
    {
        month: 'Tháng 6',
        year: '2024'
    },
    {
        month: 'Tháng 5',
        year: '2024'
    },
    {
        month: 'Tháng 4',
        year: '2024'
    },
    {
        month: 'Tháng 3',
        year: '2024'
    },
    {
        month: 'Tháng 2',
        year: '2024'
    },
    {
        month: 'Tháng 1',
        year: '2024'
    },
]

const dummyCategories = [
    {
        title: 'Tin tức',
    },
    {
        title: 'Khuyến mãi',
    },
    {
        title: 'Chưa phân loại',
    }
]
</script>

<style scoped></style>
