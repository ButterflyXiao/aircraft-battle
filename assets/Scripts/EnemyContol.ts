import { _decorator, Component, Node, resources, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyContol')
export class EnemyContol extends Component {
    @property(Number)
    speed: number = 200;

    @property(Boolean)
    public isDestroy = false;
    start() {

    }

    update(deltaTime: number) {
        //移动
        this.node.setPosition(
        this.node.getPosition().x,
        this.node.getPosition().y - this.speed * deltaTime
        );
        // this.node.setWorldPosition(v3(this.node.getWorldPosition().x, this.node.getWorldPosition().y - this.speed * deltaTime));

        if(this.node.getPosition().y < -800){
            this.node.destroy();
        }
    }

    die(){
        if(!this.isDestroy){
            this.isDestroy = true;
            resources.load(
                "enemy0_die/spriteFrame",
                SpriteFrame,
                (err: Error, data: SpriteFrame) => {
                    if(!err){
                        // 加载爆炸图片
                        this.node.getComponent(Sprite).spriteFrame = data;
                    }
    
                    // 200ms后销毁
                    setTimeout(() =>{
                        this.node?.destroy;
                    }, 200)
                }
            )    
        }
    }

    vectory(): void {
        resources.load(
          "enemy0_die/spriteFrame",
          SpriteFrame,
          (err: Error, data: SpriteFrame) => {
            if (!err) {
              this.node.getComponent(Sprite).spriteFrame = data;
            }
          }
        );
      }
}


