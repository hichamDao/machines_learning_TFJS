const xs=tf.tensor2d([[0,0],[0.5,0.5],[1,1]]);
const ys=tf.tensor1d([1,0.5,0]);

const model=tf.sequential();
const learningRate=0.1;
const numberOfEpochs=800;
const optimizer=tf.train.adam(learningRate);

model.add(tf.layers.dense({
    units:5,activation:'sigmoid',inputShape:[2]
}));
model.add(tf.layers.dense({
    units:1,activation:'sigmoid'
}));

model.compile({
    optimizer:optimizer,
    loss:'meanSquaredError',
    metrics:['accuracy']
});



model.fit(xs,ys,{
    epochs:numberOfEpochs,
    callbacks:{
        onEpochEnd:logProrgess
    }
}).then(
   predict
   //testModel();
);

async function  logProrgess(epoch,logs){
    console.log("epoch :"+epoch+" , Loss:"+logs.loss);
    await tf.nextFrame();
}

function predict(){
    console.log("Model trained")
    let data=[0,0]
    const input=tf.tensor2d([data],[1,2]);
    let prediction=model.predict(input);
    //const index=model.predict(input).argMax(-1).dataSync();
    let output= prediction.dataSync()[0];

console.log("x1="+data[0]+"x2="+data[1]+" output= "+output );
    }


