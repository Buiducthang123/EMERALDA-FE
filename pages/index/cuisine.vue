<template>
    <div>
        <section
            class="flex items-center p-6 bg-[url('https://digiticket.vn/blog/wp-content/uploads/2021/07/nha-hang-5-sao-tphcm-16.jpeg')] bg-no-repeat bg-cover h-80">
            <div class="h-fit w-full my-auto flex justify-between items-center text-white">
                <div>
                    <h1 class=" font-mono text-5xl font-bold uppercase">Nhà hàng</h1>
                    <span>Trải nghiệm ẩm thực đáng nhớ</span>
                </div>

                <div>
                    <span>Home</span>
                    <span> | </span>
                    <span>Ẩm thực</span>
                </div>
            </div>
        </section>
        <section class="flex flex-nowrap p-10 gap-10">
            <div class="w-[45%] border p-8">
                <div class="p-4 shadow-xl  bg-white hover:scale-105 transition-all">
                    <NuxtImg
                        src="https://thereedhotel.com/wp-content/uploads/2015/02/bong-lau-restaurant-doc-800x1149.jpg" />
                </div>
            </div>
            <div class="text-center w-[55%]">
                <p class="text-lg mb-4 uppercase">Hãy cùng trải nghiệm</p>
                <h6 class="font-bold text-4xl font-playFair">Dịch vụ ẩm thực tốt nhất</h6>
                <StraightLineCustom width="70px" class="mt-10 mx-auto" />
                <div class="mt-6 text-start space-y-4">
                    <p class="">
                        Những nhà hàng tại EMERALDA mang đến cho Quý khách nhiều sự lựa chọn, từ hương vị địa phương
                        từ vùng đất Cố Đô, đến những tinh hoa ẩm thực khắp mọi miền Việt Nam, hay là những món đồ Âu đầy
                        quyến rũ. Thực đơn của chúng tôi được lựa chọn kĩ càng bởi những đầu bếp kinh nghiệm nhất.
                    </p>
                    <p>
                        Những nguyên liệu được đầu bếp của chúng tôi lựa chọn một cách kỹ càng nhất, để đảm bảo rằng các
                        món
                        ăn không chỉ tươi ngon nhất, mà còn đảm bảo an toàn nhất.
                    </p>

                    <p>
                        Các nhà hàng của chúng tôi sẽ làm kỳ nghỉ của bạn sẽ trở nên đáng nhớ hơn bao giờ hết!
                    </p>
                </div>
            </div>
        </section>

        <section class="flex flex-nowrap gap-10 p-10">
            <div class="w-2/3 grid grid-cols-12 gap-10">
                <div class="col-span-6 flex gap-4">
                    <div
                        class="p-2 h-10 w-10 text-white rounded-full aspect-square bg-[#faaa41] flex items-center justify-center cursor-pointer">
                        <Icon class="text-xl"
                            name="i-streamline-food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food" />
                    </div>
                    <div>
                        <h6 class="font-playFair text-xl font-semibold mb-4">Hương vị địa phương</h6>
                        <p>Chúng tôi vinh hạnh được cùng bạn trải nghiệm tinh hoa ẩm thực Việt.</p>
                    </div>
                </div>
                <div class="col-span-6 flex gap-4">
                    <div
                        class="p-2 h-10 w-10 text-white rounded-full aspect-square bg-[#faaa41] flex items-center justify-center cursor-pointer">
                        <Icon class="text-xl"
                            name="i-streamline-food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food" />
                    </div>
                    <div>
                        <h6 class="font-playFair text-xl font-semibold mb-4">Hương vị Châu Âu</h6>
                        <p>Khám phá sự quyến rũ của các món ăn Châu Âu.</p>
                    </div>
                </div>
                <div class="col-span-6 flex gap-4">
                    <div
                        class="p-2 h-10 w-10 text-white rounded-full aspect-square bg-[#faaa41] flex items-center justify-center cursor-pointer">
                        <Icon class="text-xl" name="i-material-symbols-kid-star-outline" />
                    </div>
                    <div>
                        <h6 class="font-playFair text-xl font-semibold mb-4">Tiệc</h6>
                        <p>Địa điểm hoàn hảo cho các tiệc cùng bạn bè và người thân.</p>
                    </div>
                </div>
                <div class="col-span-6 flex gap-4">
                    <div
                        class="p-2 h-10 w-10 text-white rounded-full aspect-square bg-[#faaa41] flex items-center justify-center cursor-pointer">
                        <Icon class="text-xl" name="i-material-symbols-kid-star-outline" />
                    </div>
                    <div>
                        <h6 class="font-playFair text-xl font-semibold mb-4">Thư dãn</h6>
                        <p>Không gian ấm cúng của chúng tôi sẽ làm bạn cảm thấy thực sự thư giãn.</p>
                    </div>
                </div>

                <div class="col-span-12 h-fit flex justify-between">
                    <div class="text-center px-16 py-4 border">
                        <span class="text-[#CBAA5C] text-6xl block mb-3">
                            255
                        </span>
                        <span>
                            Món ăn
                        </span>
                    </div>
                    <div class="text-center px-16 py-4 border">
                        <span class="text-[#CBAA5C] text-6xl block mb-3">
                            120
                        </span>
                        <span>
                            Đồ uống
                        </span>
                    </div>
                    <div class="text-center px-16 py-4 border">
                        <span class="text-[#CBAA5C] text-6xl block mb-3">
                            3
                        </span>
                        <span>
                            Nhà hàng
                        </span>
                    </div>
                </div>
            </div>

            <div class="w-1/3 p-4 border">
                <div class="p-4 shadow-xl bg-white hover:scale-105 transition-all">
                    <NuxtImg src="https://thereedhotel.com/wp-content/uploads/2017/02/food-4-1200x1800.jpg" />
                </div>
            </div>
        </section>

        <section class="flex flex-nowrap max-h-64 mb-20">
            <NuxtImg src="https://hoangviettravel.vn/wp-content/uploads/2020/02/cac-mon-an-chinh-cua-nguoi-chau-au-05-min.jpg"
                class="w-1/3 object-cover" />
            <div class="w-1/3 p-10 text-center bg-[#1D2939] text-white flex justify-center items-center">
                <div>
                    <h2 class="text-lg font-playFair italic font-medium">“Bạn không cần một chiếc dĩa bạc để thưởng
                        thức món ăn ngon.”</h2>
                    <span class="tracking-widest mt-4 block ">PAUL PRUDHOMME</span>
                </div>
            </div>
            <NuxtImg src="https://cattour.vn/images/upload/images/Du-lich-chau-au/mon-an-chau-au/rosti-4.png"
                class="w-1/3 object-cover" />
        </section>
    </div>
    <Footer/>
</template>

<script setup lang="ts">

</script>

<style scoped></style>