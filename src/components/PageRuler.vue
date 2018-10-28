<!-- 页面标尺组件 -->
<template>
    <div class="ef-ruler">
        <div class="corner" :style="{top: scrollTop + 'px', left: scrollLeft + 'px'}"></div>
         <!-- <div class="ruler top">
           <div class="top-line" style="left: 416px;"></div>
            <div class="tick major" style="left: 0px;">0</div>
            <div class="tick micro" style="left: 10px;"></div>
            <div class="tick minor" style="left: 20px;"></div>
            <div class="tick micro" style="left: 30px;"></div>
            <div class="tick minor" style="left: 40px;"></div>
            <div class="tick micro" style="left: 50px;"></div>
            <div class="tick minor" style="left: 60px;"></div>
            <div class="tick micro" style="left: 70px;"></div>
            <div class="tick minor" style="left: 80px;"></div>
            <div class="tick micro" style="left: 90px;"></div>
            <div class="tick major" style="left: 100px;">100</div>
            <div class="tick micro" style="left: 110px;"></div>
            <div class="tick minor" style="left: 120px;"></div>
            <div class="tick micro" style="left: 130px;"></div>
            <div class="tick minor" style="left: 140px;"></div>
            <div class="tick micro" style="left: 150px;"></div>
            <div class="tick minor" style="left: 160px;"></div>
            <div class="tick micro" style="left: 170px;"></div>
            <div class="tick minor" style="left: 180px;"></div>
            <div class="tick micro" style="left: 190px;"></div>
            <div class="tick major" style="left: 200px;">200</div>
        </div> -->
        <div class="ruler top" :style="{top: scrollTop + 'px'}">
            <div class="tick" v-for="tick of ticks" v-bind:class="tick.class" v-bind:style="{left: tick.left + 'px'}"><span v-if="tick.class === 'major'">{{ tick.value }}</span></div>
        </div>
        <div class="ruler left" :style="{left: scrollLeft + 'px'}">
            <div class="tick" v-for="tick of ticks" v-bind:class="tick.class" v-bind:style="{top: tick.left + 'px'}"><span v-if="tick.class === 'major'">{{ tick.value }}</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                ruleWidth: 3000,
                ruleHeight: 1500 - 18,
            };
        },

        //pageWidht: 1366
        //pageHeight: 768
        //widht: 600
        //height: 500
        props: ['width', 'height', 'pageWidth', 'pageHeight', 'scrollTop', 'scrollLeft'],
        computed: {
            scale: function() {
                //两边边距80
                let realWidth = (this.width);
                let scale = this.pageWidth / realWidth;
                return scale;
            },
            minX: function() {
                let realWidth = (this.width);
                // let leftWidth = (this.ruleWidth - realWidth) / 2;
                let leftWidth = 50;
                return parseInt(-(leftWidth * this.scale), 0);
            },
            maxX: function() {
                let realWidth = (this.width);
                // let leftWidth = (this.ruleWidth - realWidth) / 2;
                let leftWidth = this.ruleWidth - realWidth - 50;
                return parseInt((leftWidth * this.scale) + this.pageWidth, 0);
            },
            left: function() {
                return 10 / this.scale;
            },
            ticks: function() {
                console.log(this.width + "," + this.height + ";" + this.pageWidth + "," + this.pageHeight);
                console.log("scale:" + this.scale);
                console.log("minX:" + this.minX);

                let ticks = [];
                var i = 0;
                console.log(this.minX % 20);
                let offset = this.minX % 20;
                ticks[i] = {class: 'micro', value: this.minX, left: offset};
                i++;

                let minX = this.minX - offset;
                let majorIndex = 0;
                let className = '';

                //先处理非整20的数据
                for (var x = minX; x <= this.maxX; x += 20) {
                    if (x % 100 === 0) {
                        className = 'major';
                        majorIndex = i;
                    } else {
                        className = (i - majorIndex) % 2 === 0 ? 'minor' : 'micro';
                    }
                    ticks[i] = {class: className, value: x, left: this.left * 2 * i};
                    i++;
                }
                console.log(ticks);
                return ticks;
            }
        }
    };
</script>

<style scoped>
    .ef-ruler{
        position: relative;
        z-index: 999;
    }
    .ef-ruler .corner{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 18px;
        height: 18px;
        background-color: #fff;
        border-width: 0 1px 1px 0;
        border-style: solid;
        border-color: #000;
        z-index: 999;
    }
    .ef-ruler .top {
        position: absolute;
        top: 0;
        left: 18px;
        width: 3000px;
        height: 18px;
        border-bottom: 1px solid #000;
    }


    .ef-ruler .ruler {
        background: none repeat scroll 0% 0% #FFF;
        color: #444;
        font-family: source code pro, "Arial Narrow", "Helvetica Neue", Helvetica, Arial, Veranda, sans-serif;
        font-size: 9px;
        line-height: 14px;
        overflow: hidden;
        z-index: 1;
    }

    .ef-ruler .top-line {
        position: absolute;
        top: 0;
        width: 0;
        height: 18px;
        border-left: 1px solid #000;
        z-index: 3;
    }

    .ef-ruler .top .major {
        position: absolute;
        top: 0;
        width: 1px;
        height: 100%;
        text-indent: 1px;
    }

    .ef-ruler .left{
        line-height: 36px;
    }

    .ef-ruler .tick {
        background: none repeat scroll 0% 0% #444;
    }

    .ef-ruler .top .micro {
        position: absolute;
        bottom: 0px;
        width: 1px;
        height: 4px;
    }

    .ef-ruler .top .minor {
        position: absolute;
        bottom: 0px;
        width: 1px;
        height: 6px;
    }

    
    .ef-ruler .left{
        position: absolute;
        top: 18px;
        left: 0;
        width: 18px;
        height: 3000px;
        border-right: 1px solid #000;
    }

    .ef-ruler .left .major{
        position: absolute;
        right: 0;
        height: 1px;
        width: 100%;
        text-indent: 1px;
    }
    .ef-ruler .left .major span{
        display: block;
        -moz-transform: rotate(-90deg);/* Firefox 旋转属性，参数表示角度(deg表示角度)，负数逆时针，正数顺时针 */                
        -webkit-transform: rotate(-90deg);/* Safari和Chrome */
        -ms-transform: rotate(-90deg);/* IE 9 */
        -o-transform: rotate(-90deg);/* Opera */
        transform: rotate(-90deg);
    }

    .ef-ruler .left .micro {
        position: absolute;
        right: 0px;
        height: 1px;
        width: 4px;
    }

    .ef-ruler .left .minor {
        position: absolute;
        right: 0px;
        height: 1px;
        width: 6px;
    }
</style>