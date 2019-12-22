// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        type: cc.String,
        pengzhuang: cc.String,
        map: cc.Array,
        onetwo: cc.SpriteFrame,
        onethree: cc.SpriteFrame,
        twoone: cc.SpriteFrame,
        threeone: cc.SpriteFrame,
        gameview:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.map = [
        //     ["1*2", 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, "1*2", 0],
        //     [0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0],
        // ]
        // var m = this.map;
        // //绘制地图
        // for (var i = 0; i < m.length; i++) {
        //     for (var j = 0; j < m.length; j++) {
        //         if (m[i][j] == "1*2") {
        //             //绘制1*2的纵向的
        //             var node = new cc.Node();
        //             var sprite = node.addComponent(cc.Sprite);
        //             sprite.spriteFrame = this.onetwo;
        //             node.width = 100;
        //             node.height = 100;
        //             node.x = 300;
        //             node.y = 300;
        //             node.type = "v";
                    
        //             node.on(cc.Node.EventType.TOUCH_START, function (t) {
        //                 // console.log("触摸开始");
        //             }, node)
        //             //监听
        //             node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, node);
        //             //this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this);
        //             //触摸抬起
        //             node.on(cc.Node.EventType.TOUCH_END, this.on_touch_move_end, node);
        //             node.on(cc.Node.EventType.TOUCH_CANCEL, this.on_touch_move_end, node);
        //             cc.director.getScene().addChild(node);
        //         }
        //     }
        // }




        this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
            // console.log("触摸开始");
        }, this)
        //监听
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        //this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this);
        //触摸抬起
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_move_end, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.on_touch_move_end, this);
        cc.director.getCollisionManager().enabled = true; //开启碰撞检测，默认为关闭
        cc.director.getCollisionManager().enabledDebugDraw = true; //开启碰撞检测范围的绘制
        cc.director.getCollisionManager().enabledDrawBoundingBox = true; //开启碰撞组件的包围盒绘制
    },
    on_touch_move_end(t) {
        // cc.log(t)
        // cc.log("触摸结束")
    },

    on_touch_move(t) {
        //定义一个n_pos变量存储当前触摸点的位置
        var n_pos = t.getLocation();
        // console.log(n_pos,n_pos.x,n_pos.y);
        //获取父节点的坐标
        var parent = t.target._parent;
        var p_startx = parent.x
        var p_starty = parent.y
        var p_endx = p_startx + parent.width
        var p_endy = p_startx + parent.height
        var delta = t.getDelta();



        if (this.type == "v") {
            //修改之后的纵坐标
            var ry = this.node.y + delta.y
            if (ry < p_endy - parent.height / 2 - this.node.height / 2 && ry > p_starty - parent.height / 2 + this.node.height / 2) {
                this.node.y += delta.y;
            }
        }
        if (this.type == "h") {
            var rx = this.node.x + delta.x
            if (rx < p_endx - parent.width / 2 - this.node.width / 2 && rx > p_startx - parent.width / 2 + this.node.width / 2) {
                this.node.x += delta.x;
            }
        }

    },
    start() {

    },
    onCollisionEnter: function (other, self) {
        // cc.log(other)
        cc.log("碰上了")
        this.pengzhuang = "true"
        cc.log(other.tag)
    },
    onCollisionExit: function (other, self) {
        cc.log("离开了")
        cc.log(other.tag)

    }
    // update (dt) {},
});
