class Sprite{
    constructor({position,imageSrc,scale=1,framesMax=1,offset={x:0,y:0}}){
        this.position=position 
        // this.velocity=velocity
       
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
        // this.lastKey

        // this.attackBox={
        //     position:{
        //         x:this.position.x,
        //         y:this.position.y,
        //     },
        //     offset,
        //     width:100,
        //     height:50,
        // }
        // this.color=color
        // this.isAttacking
        // this.health=100
    }



    draw(){
        c.drawImage(
            this.image,
            this.frameCurrent*(this.image.width / this.framesMax),// (1024/1)
            0,
            this.image.width/this.framesMax,
            this.image.height,

            this.position.x-this.offset.x,
            this.position.y-this.offset.y,
            (this.image.width/this.framesMax)*this.scale,
            this.image.height*this.scale)
        // c.fillStyle=this.color
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)
        // //attack box
        //  if(this.isAttacking){
        // c.fillStyle='green'
        // c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
        // }
    }
    animateFrame(){
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold===0){
        if(this.frameCurrent<this.framesMax-1){
            this.frameCurrent++
        }
        else{
            this.frameCurrent = 0
        }
    }
    }
    update(){
        this.draw()
        this.animateFrame()
    //    this.attackBox.position.x=this.position.x + this.attackBox.offset.x
    //    this.attackBox.position.y=this.position.y

    //     this.position.x+=this.velocity.x
    //     this.position.y +=this.velocity.y

    //     if(this.position.y+this.height+this.velocity.y>=canvas.height){
    //         this.velocity.y=0
    //     }
    //     else
    //     this.velocity.y+=gravity     
    }
    // attack(){
    // this.isAttacking=true;
    // setTimeout(()=>{
    //     this.isAttacking=false
    // },100)
    // }
}

class Fighter extends Sprite {

    constructor({
        position,velocity,color='red',imageSrc,scale=1,framesMax=1,offset={x:0,y:0},sprites,attackBox={offset:{},width:undefined,height:undefined}}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
       
        this.velocity=velocity
        this.width=50
        this.height=150
        this.lastKey
        this.attackBox={
            position:{
                x:this.position.x,
                y:this.position.y,
            },
            offset:attackBox.offset,
            width:attackBox.width,
            height:attackBox.height,
        }
        this.color = color
    this.isAttacking
    this.health = 100
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.sprites = sprites
    this.dead=false

        for(const sprite in this.sprites){
           sprites[sprite].image=new Image()
           sprites[sprite].image.src=sprites[sprite].imageSrc
        }


    }
    // draw(){
    //     c.fillStyle=this.color
    //     c.fillRect(this.position.x,this.position.y,this.width,this.height)
    //     //attack box
    //      if(this.isAttacking){
    //     c.fillStyle='green'
    //     c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
    //     }
    // }
    update(){
        this.draw()
        if(!this.dead)
        this.animateFrame()
   


       this.attackBox.position.x=this.position.x + this.attackBox.offset.x
       this.attackBox.position.y=this.position.y+ this.attackBox.offset.y

    //    c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)

        this.position.x+=this.velocity.x
        this.position.y +=this.velocity.y

        if(this.position.y+this.height+this.velocity.y>=canvas.height-96){
            this.velocity.y=0
            this.position.y=330
          
        }
        else
        this.velocity.y+=gravity
        // console.log(this.position.y)
      
    }
    attack(){
        this.switchSprite('attack1') 
    this.isAttacking=true;
    }
    takeHit() {
        this.health -= 20
    
        if (this.health <= 0) {
          this.switchSprite('death')
        } else this.switchSprite('takeHit')
      }
    switchSprite(sprite){

        if(this.image === this.sprites.death.image){
            if(this.frameCurrent===this.sprites.death.framesMax-1)this.dead=true;
            return 
        }

        //overding all other animation
        if (
            this.image === this.sprites.attack1.image
            &&
            this.frameCurrent<this.sprites.attack1.framesMax-1
          ){
            return
        }

        //overdie when rider gets hit
        if (
            this.image === this.sprites.takeHit.image &&
            this.frameCurrent < this.sprites.takeHit.framesMax - 1
          )
            return
        switch(sprite){
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                  this.image = this.sprites.idle.image
                  this.framesMax = this.sprites.idle.framesMax
                  this.framesCurrent = 0
                }
                break
              case 'run':
                if (this.image !== this.sprites.run.image) {
                  this.image = this.sprites.run.image
                  this.framesMax = this.sprites.run.framesMax
                  this.framesCurrent = 0
                }
                break
              case 'jump':
                if (this.image !== this.sprites.jump.image) {
                  this.image = this.sprites.jump.image
                  this.framesMax = this.sprites.jump.framesMax
                  this.framesCurrent = 0
                }
                break;
                case 'fall':
                    if (this.image !== this.sprites.fall.image) {
                      this.image = this.sprites.fall.image
                      this.framesMax = this.sprites.fall.framesMax
                      this.framesCurrent = 0
                    }
                    break
                    case 'attack1':
                        if (this.image !== this.sprites.attack1.image) {
                          this.image = this.sprites.attack1.image
                          this.framesMax = this.sprites.attack1.framesMax
                          this.framesCurrent = 0
                        }
                        break
                        case 'takeHit':
                            if (this.image !== this.sprites.takeHit.image) {
                              this.image = this.sprites.takeHit.image
                              this.framesMax = this.sprites.takeHit.framesMax
                              this.framesCurrent = 0
                            }
                            break
                            case 'death':
                                if (this.image !== this.sprites.death.image) {
                                  this.image = this.sprites.death.image
                                  this.framesMax = this.sprites.death.framesMax
                                  this.framesCurrent = 0
                                }
                                break
                                
                            
        
            

        }
    }
}
