import { _decorator, Component, Vec3, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    @property(Boolean)
    private symbol: boolean = true;


    start() {

        //遍历背景图
    }

    update(deltaTime: number) {
        if(this.symbol){
            //移动
            for(let bgNode of this.node.children){
                bgNode.setPosition(
                    bgNode.getPosition().x,
                    bgNode.getPosition().y - 250 * deltaTime
                )
                if(bgNode.getPosition().y < -850){
                    bgNode.setPosition(
                        bgNode.getPosition().x,
                        bgNode.getPosition().y + 820 * 2
                    )
                }
            }
        }
    }

    restart(): void {
        this.symbol = false
      }
    
      pause(): void {
        this.symbol = false
      }
}


