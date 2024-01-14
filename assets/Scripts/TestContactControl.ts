import { _decorator, Collider2D, Component, Contact2DType, EventTouch, IPhysics2DContact, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestContactControl')
export class TestContactControl extends Component {
    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
           
        }

        this.node.on(Node.EventType.MOUSE_MOVE, (event: EventTouch) => {
            this.node.setWorldPosition(
                v3(event.getUILocation().x, event.getUILocation().y)
            );
        })
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
    }

    update(deltaTime: number) {
        
    }
}


