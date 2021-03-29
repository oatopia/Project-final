import {React,useEffect,useState} from "react";
import Axios from 'axios'
import './Match-member.css';



export default function Match(){
    const [factorlist,setFactorlist] = useState([]);
    const [weight,setWeight] = useState([]);
    const [match,setMatch] = useState([]);

    useEffect(()=>{
        Axios.get('/api/match/getfactor',{
        }).then(Response=>{
            setFactorlist(Response.data);
            
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const saveweight = () =>{
        Axios.post('/api/match/createweight',weight)
        .then(Response => {
            console.log(Response);
        }).catch(error=>{
            console.log(error);
        })
    }
    

    const addImage = (index)=> (e) =>{
        
        if(weight.length > 0){
            let have = 'false';
            weight.map(item=>{
                if(item.Id == index){
                    return have = 'true';
                }
                return have = 'false';
            })
            if(have == 'true'){
                let edit = weight.map(item=>{
                    if(item.Id == index){
                     return {...item,Image:e.target.value};
                    }
                    return item;
                });
                setWeight(edit);
            }else{
                setWeight([...weight,{Id:index, Image:e.target.value, Weight:'1'}]);
                console.log(weight)
            }
            
        }else{
            setWeight([{Id:index, Image:e.target.value, Weight:'1'}]);
            console.log(weight)
        }
        // for(let i =0 ; i<weight.length;i++){
        //     if(index == weight[i].Id){
        //         let editimg = [...weight];
        //         editimg[i].Image = e.target.value;
        //         setWeight(editimg);
        //     }else{
        //         setWeight([...weight,{Id:index, Image:e.target.value, Weight:'1'}]);
        //     }
        // }
    }

    const addWeight = (index)=> (e) =>{
        if(weight.length){
            let have = 'false';
            weight.map(item=>{
                if(item.Id == index){
                    return have = 'true';
                }
                return have = 'false';
            })
            if(have=='true'){
                let edit = weight.map(item=>{
                    if(item.Id == index){
                     return {...item,Weight:e.target.value};
                    }
                    return item;
                });
                setWeight(edit);
            }else{
                setWeight([...weight,{Id:index, Image:'', Weight:e.target.value}]);
                console.log(weight);
            }
            
        }else{
            setWeight([{Id:index, Image:'', Weight:e.target.value}]);
            
        }
    }

    const showimage = () =>{
        let index = 0;
        let array = [];
        for (let i = 0; i < factorlist.length; i++) {
            for (let j = i+1; j < factorlist.length; j++) {
                array.push(<div id="contain-match-display" key={index}>
                    <img  value={factorlist[i].Image_factor} src={('http://localhost:4000/images/'+factorlist[i].Image_factor)} width="70" height="70"></img>
                    <input value={factorlist[i].Id} type="radio" id="radio-1" name={index} onChange={addImage(index)} ></input>
                    <img value={factorlist[j].Image_factor} src={('http://localhost:4000/images/'+factorlist[j].Image_factor)} width="70" height="70"></img>
                    <input value={factorlist[j].Id} type="radio" id="radio-2" name={index} onChange={addImage(index)}></input>
                    <select className="select-score" defaultValue="1" onChange={addWeight(index)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                    
                    
                </div>)
                index++;
            }
            
        }
        return array;
    }  

    const matchFac = () => {
        Axios.post('/api/match/matchDorm',weight)
        .then(Response => {
            console.log(Response);
        }).catch(error=>{
            console.log(error);
        })
        // let matrix = [[]];
        // let matrixlenght = factorlist.length;
        // for (let i = 0; i < matrixlenght; i++) {
        //     for (let j = 0; j < matrixlenght; j++) {
        //         matrix[i] = [];
        //     }
        // }

        
        // for (let i = 0; i < matrixlenght; i++) {
        //     for (let j = 0; j < matrixlenght; j++) {
        //         matrix[i][j] = 1;
        //     }
        // }

        // let n =0 ;
        // for (let i = 0; i < matrixlenght; i++) {
        //     for (let j = 0; j < matrixlenght; j++) {
        //         if(i == j){
        //             matrix[i][j] = 1;
        //         }else{
        //             if(j > i){
                        // let id = (weight[n].Image) - 1;
                        // if(i == id){
                            // matrix[i][j] = 1;

                            // var number = 1/weight[n].Weight;
                            // matrix[j][i] = number.toFixed(2);
                            // matrix[j][i] = 2;
                            // n++;
                        // }else{
                            // var number = 1/weight[n].Weight;
                            // matrix[i][j] = number.toFixed(2);
                            // matrix[i][j] = 2;

                            // matrix[j][i] = 1;
                            // n++;
                        // }
        //             }
        //         }
        //     }
        // }

        
        // console.log(matrix);

        // let sum
        // let arraysum = [];
        // for (let i = 0; i < matrixlenght; i++) {
        //     for (let j = 0; j < matrixlenght; j++) {
        //         sum = sum + matrix[j][i];
        //     }
        //     arraysum.push(sum);
        //     sum = 0;
        // }

        // console.log(arraysum);

        // for (let i = 0; i < matrixlenght; i++) {
        //     for (let j = 0; j < matrixlenght; j++) {
        //         let value = matrix[i][j]/arraysum[j];
        //         matrix[i][j] = value.toFixed(2);
        //     }
        // }

        // for (let i = 0; i < matrix.length; i++) {
        //     for (let j = 0; j < matrix.length; j++) {
        //         console.log(matrix[i][j]+' ');
        //     }
        //     console.log(' ');
        // }
    }



    return(
    <div className="containermatch"> 
        <div >
            <h1 id="header2" >โปรดให้คะแนนระดับความสำคัญของปัจจัย ดังต่อไปนี้</h1>
            <div className="containermatch-2">
                {factorlist.map((data,key)=>{
                    return(
                        <div className='detail' key={key}>
                            <img src={('http://localhost:4000/images/'+data.Image_factor)} width="50" height="50" id={key}></img>
                            <label >{data.Factor_name}</label>
                        </div>
                    )
                })}
            </div>
            <div className="containermatch-3">
                {showimage()}
            </div>

           
            <button onClick={saveweight}>บันทึก</button>
            <button onClick={matchFac}>จับคู่หอพัก</button>
        </div>
        
    </div>
    );
}