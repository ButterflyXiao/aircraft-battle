import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {
    @property
    speed: number = 800;
    start() {

    }

    update(deltaTime: number) {
        //移动
        this.node.setPosition(
            this.node.getPosition().x,
            this.node.getPosition().y + this.speed * deltaTime
        );
        if(this.node.getPosition().y > 820){
            this.node.destroy();
        }
    }

    miss(){
        try {
            this.node?.destroy();
        } catch (e) {
            // ..
        }        
    }
}


