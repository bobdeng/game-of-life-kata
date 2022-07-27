import Game from "../../src/components/Game";
import {createLocalVue, mount} from "@vue/test-utils";

const localVue = createLocalVue()
describe("游戏页面", () => {
    it('开始游戏开始绘制，所有返回都是无', function () {
        Math.random = () => 0.1;
        const clearRects = []
        const fillRects = []
        const context = {
            fillRect: (x) => {
                fillRects.push(x)
            },
            clearRect: (x, y) => {
                clearRects.push(x + "" + y)
            }
        };
        const wrapper = mount(Game, {
            localVue,
            methods: {
                context: () => context
            }
        })
        wrapper.find('#button_begin').trigger('click')
        expect(wrapper.vm.$data.game).toBeDefined()
        expect(clearRects).toHaveLength(10000)
        expect(fillRects).toHaveLength(0)
    });

    it('开始游戏开始绘制，所有返回都是有', function () {
        Math.random = () => 0.9;
        const clearRects = []
        const fillRects = []
        const context = {
            fillRect: (x) => {
                fillRects.push(x)
            },
            clearRect: (x, y) => {
                clearRects.push(x + "" + y)
            }
        };
        const wrapper = mount(Game, {
            localVue,
            methods: {
                context: () => context
            }
        })
        wrapper.find('#button_begin').trigger('click')
        expect(wrapper.vm.$data.game).toBeDefined()
        expect(clearRects).toHaveLength(10000)
        expect(fillRects).toHaveLength(10000)
    });
})