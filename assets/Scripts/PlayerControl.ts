import { _decorator, Collider2D, Component, Contact2DType, director, EventTouch, find, Game, instantiate, IPhysics2DContact, Node, PhysicMaterial, PhysicsSystem2D, Prefab, resources, Sprite, SpriteFrame, v3 } from 'cc';
import { EnemyContol } from './EnemyContol';
import { BulletControl } from './BulletControl';
import { BgControl } from './BgControl';
import { EnemyManager } from './EnemyManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {

    @property(Prefab)
    bulletPre: Prefab = null;

    protected onLoad(): void {
        // PhysicsSystem2D.instance?.on(
        //     Contact2DType.BEGIN_CONTACT,
        //     this.onBeginContact,
        //     this
        // );
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            
        }

        // 注册全局碰撞回调函数
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            
        }
    }

    onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ){
  
        console.debug("self:"+selfCollider.tag + "other:"+otherCollider.tag);

    // 子弹和敌人碰撞
    if (
        (selfCollider.tag === 0 && otherCollider.tag === 1) ||
        (selfCollider.tag === 1 && otherCollider.tag === 0)
      ) {
        selfCollider.tag === 0
          ? selfCollider.getComponent(BulletControl).miss()
          : selfCollider.getComponent(EnemyContol).die();
        otherCollider.tag === 1
          ? otherCollider.getComponent(EnemyContol).die()
          : otherCollider.getComponent(BulletControl).miss();
      }
  
      // 敌人和英雄碰撞
      if (
        (selfCollider.tag === 1 && otherCollider.tag === 2 && !selfCollider.getComponent(EnemyContol).isDestroy) ||
        (selfCollider.tag === 2 && otherCollider.tag === 1 && !otherCollider.getComponent(EnemyContol).isDestroy)
      ) {
        find("Canvas/bg").getComponent(BgControl)?.pause();
        // find("Canvas/EnemyManager").getComponent(EnemyManager)?.pause();
        selfCollider.tag === 1
          ? selfCollider.getComponent(EnemyContol).vectory()
          : otherCollider.getComponent(EnemyContol).vectory();
        this.lose();
        director.pause();
        //飞机不可移动

      }
    }
    start() {

        this.node.on(Node.EventType.MOUSE_MOVE, (event: EventTouch) => {
            this.node.setWorldPosition(
                v3(event.getUILocation().x, event.getUILocation().y)
            );
        })

        // 攻击。计时器
        this.schedule(() =>{
            // 创建子弹
            let bullet = instantiate(this.bulletPre);
            bullet.setParent(this.node.parent);
            bullet.setPosition(
                this.node.getPosition().x, 
                this.node.getPosition().y + 80
            )

        }, 0.2);

    }

    update(deltaTime: number) {
        
    }
    lose(): void {
        // 暂停所有计时器
        this.unscheduleAllCallbacks();
        resources.load(
          "hero1_die/spriteFrame",
          SpriteFrame,
          (err: Error, data: SpriteFrame) => {
            if (!err) {
              this.node.getComponent(Sprite).spriteFrame = data;
            }
          }
        );
      }
    
      onDestroy(): void {
        this.node.destroy();
        // 暂停所有计时器
        this.unscheduleAllCallbacks();
      }
}


