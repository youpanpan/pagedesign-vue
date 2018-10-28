/**
 * 组件管理JS
 */
import ButtonComponent from './buttoncomponent/ButtonComponent.vue';
import IconComponent from './iconcomponent/IconComponent.vue';
import ImageComponent from './imagecomponent/ImageComponent.vue';
import TextComponent from './textcomponent/TextComponent.vue';
import LinkComponent from './linkcomponent/LinkComponent.vue';
import TagComponent from './tagcomponent/TagComponent.vue';
import InputComponent from './inputcomponent/InputComponent.vue';
import DivComponent from './divcomponent/DivComponent.vue';

 export default {
    registComponents: {
        "ButtonComponent": ButtonComponent,
        "IconComponent": IconComponent,
        "ImageComponent": ImageComponent,
        "TextComponent": TextComponent,
        "LinkComponent": LinkComponent,
        "TagComponent": TagComponent,
        "InputComponent": InputComponent,
        "DivComponent": DivComponent
    }
 };