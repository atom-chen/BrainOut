import { ui } from "../../ui/layaMaxUI";
import BaseLevel from "./BaseLevel";
import GM from "../GM";

export default class Level_27 extends BaseLevel {
    private ui: ui.level27UI;

    constructor() { super(); }

    onInit(): void {
        if (this.isInit) {
            return;
        }
        this.ui = new ui.level27UI();
        this.addChild(this.ui);
        this.isInit = true;

        this.ui.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.ui.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);

        this.ui.sureBtn.clickHandler = new Laya.Handler(this, this.onSure);
        this.refresh();
    }

    private _lastDistance: number = 0;
    private _downScale: number = 0;
    private onMouseDown(e: Laya.Event = null): void {
        let touches: any[] = e.touches;
        if (touches && touches.length == 2) {
            // _mapImg.stopDrag();
            this._lastDistance = this.getDistance(touches);
            this._downScale = this.ui.shi.scaleX;
            // _localPoint = _mapImg.globalToLocal(new Point(touches[0].stageX, touches[0].stageY));
            this.ui.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        }
    }

    private onMouseMove(e: Laya.Event = null): void {
        let touches: any[] = e.touches;
        if (touches && touches.length == 2) {
            this.ui.antImg.visible = true;
            var distance: number = this.getDistance(touches);
            //判断当前距离与上次距离变化，确定是放大还是缩小
            var a: number = distance / this._lastDistance;
            let ss:number = this._downScale * a;
            ss = Math.min(2.8,ss);
            ss = Math.max(1,ss);
            this.ui.shi.scale(ss, ss);
        }
    }

    private onMouseUp():void
    {
        this.ui.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    }

    /**计算两个触摸点之间的距离*/
    private getDistance(points: any[]): number {
        var distance: number = 0;
        if (points && points.length == 2) {
            var dx: number = points[0].stageX - points[1].stageX;
            var dy: number = points[0].stageY - points[1].stageY;
            distance = Math.sqrt(dx * dx + dy * dy);
        }
        return distance;
    }

    refresh(): void {
        Laya.MouseManager.multiTouchEnabled = true;
        Laya.MouseManager.enabled = true;
        super.refresh();
        this.ui.shuru.text = "";
        this.ui.shi.scaleX = this.ui.shi.scaleY = 1;
        this.ui.antImg.visible = false;
    }

    private onSure(): void {
        this.setAnswer(this.ui.rightBox, this.ui.shuru.text == "17");
    }
}