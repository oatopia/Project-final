import {React,useEffect,useState} from "react";
import Axios from 'axios'
import './Match.css';



export default function Match(){
    const [factorlist,setFactorlist] = useState([]);
    const [weight,setWeight] = useState([]);

    Axios.get('api/match/getfactor',{timeout: 100
    }).then(Response=>{
        setFactorlist(Response.data);
    })

    const saveweight = () =>{
        Axios.post('api/match/saveweight',{
            weight
        }).then(Response=>{
            setFactorlist(Response.data);
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
            }
            
        }else{
            setWeight([...weight,{Id:index, Image:e.target.value, Weight:'1'}]);
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
                setWeight([...weight,{Id:index, Image:"", Weight:e.target.value}]);
            }
            
        }else{
            setWeight([...weight,{Id:index, Image:"", Weight:e.target.value}]);
        }
        // for(let i =0 ; i<weight.length;i++){
        //     if(index == weight[i].Id){
        //         let editw = [...weight];
        //         editw[i].Weight = e.target.value;
        //         setWeight(editw);
        //     }else{
                
        //     }
        // }
    }

    const showimage = () =>{
        let index = 0;
        let array = [];
        for (let i = 0; i < factorlist.length; i++) {
            for (let j = i+1; j < factorlist.length; j++) {
                array.push(<div id="contain-match-display" key={index}>
                    <img for="radio-1" value={factorlist[i].Image_factor} src={('http://localhost:4000/images/'+factorlist[i].Image_factor)} width="100" height="100"></img>
                    <input value={factorlist[i].Image_factor} type="radio" id="radio-1" name={index} onChange={addImage(index)} ></input>
                    <img for="radio-2"value={factorlist[j].Image_factor} src={('http://localhost:4000/images/'+factorlist[j].Image_factor)} width="100" height="100"></img>
                    <input value={factorlist[j].Image_factor} type="radio" id="radio-2" name={index} onChange={addImage(index)}></input>
                    <select classname="select-score" onChange={addWeight(index)}>
                        <option selected  value="1">1</option>
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

    const showweight = () =>{
        return (
            <div>
                {weight.map(data=>{
                    return(
                        <div>
                    <p>{data.Image}</p>
                    <p>{data.weight}</p>
                    </div>)
                })}
            </div>
        )
    }
    
    return(
    <div className="containermatch"> 
        <div >
            <h1 id="header2" >โปรดให้คะแนนระดับความสำคัญของปัจจัย ดังต่อไปนี้</h1>

            <div className="containermatch-2">
                {factorlist.map(data=>{
                    return(
                        <div>
                            <img src={('http://localhost:4000/images/'+data.Image_factor)} width="100" height="100"></img>
                            <p>มีความหมายว่า {data.Factor_name}</p>
                        </div>
                    )
                })}
            </div>
            <div className="containermatch-3">
                {showimage()}
            </div>
            <button >บันทึก</button>
            <button onClick={showweight}>จับคู่หอพัก</button>
            <pre>{JSON.stringify(weight,null,2)}</pre>
        </div>
        
    </div>
    );
}