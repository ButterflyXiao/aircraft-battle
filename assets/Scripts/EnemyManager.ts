import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    enemyPre :Prefab = null;

    @property(Boolean)
    private symbol: boolean = true;

    start() {
        // 每隔2s，创建一个随机位置的敌机
        if(this.symbol){
            this.schedule(() =>{
                let enemy = instantiate(this.enemyPre);
                enemy.setParent(this.node.parent);
                let xPos = Math.random() * 480;
                enemy.setPosition(
                    xPos - 240, 
                    this.node.getPosition().y
                )
            }, 0.5);
        }
    }

    update(deltaTime: number) {
        
    }

    pause(): void {
        this.symbol = false
    }
    
}


