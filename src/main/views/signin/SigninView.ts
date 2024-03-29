import { ui } from "../../../ui/layaMaxUI";
import SigninCell from "./SigninCell";
import GM from "../../GM";
import { ViewID } from "../ViewID";
import PlatformID from "../../platforms/PlatformID";
import GameBox from "../../GameBox";
import Game from "../../../core/Game";
import GameEvent from "../../GameEvent";
import AdType from "../main/AdType";

export default class SigninView extends ui.qiandaoUI {
    private gameBox: GameBox;
    private itemList: SigninCell[] = [];
    private data: number[] = [1, 1, 1, 2, 3];

    static INDEX:number;
    constructor() {
        super();
        for (let i = 0; i < 5; i++)  {
            let cell: SigninCell = new SigninCell();
            this.addChild(cell);
            this.itemList.push(cell);
            if (i < 3)  {
                cell.pos(i * 250, 480);
            }
            else  {
                cell.pos(125 + (i - 3) * 225, 760);
            }
            cell.update(i, this.data[i]);
        }
        GM.imgEffect.addEffect(this.fanhui, 3);
        GM.imgEffect.addEffect(this.topImg, 2);
        GM.imgEffect.addEffect(this.bottomImg, 2);

        this.fanhui.on(Laya.Event.CLICK, this, this.onBack);

        if (GM.platformId == PlatformID.WX && GM.iconSwitch == 1)  {
            this.gameBox = new GameBox();
            this.gameBox.fromTag = GameBox.qiandao;
        }

        this.on(Laya.Event.UNDISPLAY,this,this.onUndis);

        Game.eventManager.on(GameEvent.AD_SUCCESS_CLOSE,this,this.onAddKey);
        Game.eventManager.on(GameEvent.SHARE_SUCCESS,this,this.onAddKey)
    }

    private onAddKey(type:number):void
    {
        if(type == AdType.signin)
        {
            let index = SigninView.INDEX;
            let cell: SigninCell = this.itemList[index];
            cell.updateView();
        }
    }

    removeBox():void
    {
        this.gameBox && this.gameBox.removeSelf();
    }

    private onUndis():void
    {
        this.gameBox && this.gameBox.removeSelf();
    }

    addBox(): void  {
        if (GM.platformId == PlatformID.WX && GM.iconSwitch == 1)  {
            this.addChild(this.gameBox);
            this.gameBox.pos(0,220);
        }
    }

    private onBack(): void  {
        GM.viewManager.closeView2(ViewID.signin);
        this.gameBox && this.gameBox.removeSelf();
        GM.hideTTBanner();
    }
}