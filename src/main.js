import './style.css'

const random = RNG(inscription_id);

//Usage of Random Number Generator
let integerRange = random.i(1,10); //10 excluded
let floatRange = random.r(10,100); //100 excluded
let floatNumber = random.f(); // betwen 0,1
let bool = random.b(80,20); // True with 80% probability
let element = random.e(["#d1c6ad","#bbada0","#a1869e","#797596","#0b1d51"]); // return a random element from array
let weighted_element = random.w([65,30,5],["#a18","#797","#0b1"]); //Sum of weights should be 100, Dark green will be rare
let weightedIndex = random.wR([10,20,30,40]);
console.log("Integer:",integerRange)
console.log("Float Range:",floatRange)
console.log("Float 0-1:",floatNumber)
console.log("Weighted bool:",bool)
console.log("Random Element:",element);
console.log("Weigted Element", weighted_element)
console.log("Weigted Index", weightedIndex)
// END of RNG usage 

let gsv = 0; //global scaling value use it to achieve resolution agnostic compositions
const elementCount = 100

let sketch = (p)=>{

  p.setup = ()=>{
    p.createCanvas(100,100);
    p.windowResized();
  }

  p.draw = () =>{
    random.reset();

    gsv = p.width/1000
    p.background("#eca")

    for(let i=0;i<elementCount;i++){
      let x = random.r(0,p.width);
      let y = random.r(0,p.height);
      let s = random.f()*100*gsv;
      let color = random.w([65,30,5],["#a18","#237","#0b1"]);
      
      p.fill(color)
      p.push()
      p.translate(x,y);

      p.rotate(random.r(0,p.TWO_PI));
      p.rect(0,0,s,s);
      p.pop()
    }
    
  }

  p.windowResized = ()=>{
    let w = Math.min(window.innerWidth, window.innerHeight);
    p.resizeCanvas(w,w);
  }
}

let myp5 = new p5(sketch)