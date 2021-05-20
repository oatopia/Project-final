import { React, useEffect, useState } from 'react';
import './matchVisitor.css';
import Navbar from '../component/Navbar/Navbar.js';
import Axios from 'axios'
import { useHistory, useLocation } from 'react-router';
import imagetest from '../img/livingroom1.jpg'
import { Prev } from 'react-bootstrap/esm/PageItem';

function MatchVisitor() {
    let history = useHistory();
    let location = useLocation();
    let payload = location.state;
    const [dorm, setDorm] = useState([])
    useEffect(() => {
        Axios.get("api/visitor/getdetail").then((Response) => {
            let data = Response.data
            console.log(data)
            payload.map(element=>{
                let getimg = data[0].filter(item => item.dorm_ID == element.dorm_ID)
                let getroom = data[1].filter(item => item.dorm_ID == element.dorm_ID)
                let getfacility = data[2].filter(item => item.dorm_ID == element.dorm_ID)
                setDorm(prev => [...prev, {
                            Image: getimg,
                            Room: getroom,
                            Facility: getfacility,
                            Dorm: element
                        }])
            })
        })
    }, []);
    // useEffect(() => {
    //     let img, room, facility
    //     Axios.get("api/visitor/getimage").then((Response) => {
    //         Axios.get("api/visitor/getroom").then((Response1) => {
    //             Axios.get("api/visitor/getfacility").then((Response2) => {
    //                 img = Response.data
    //                 room = Response1.data
    //                 facility = Response2.data
    //                 payload.forEach(element => {
    //                     let getimg = img.filter(item => item.dorm_ID == element.dorm_ID)
    //                     let getroom = room.filter(item => item.dorm_ID == element.dorm_ID)
    //                     let getfacility = facility.filter(item => item.dorm_ID == element.dorm_ID)
    //                     setDorm(prev => [...prev, {
    //                         Image: getimg,
    //                         Room: getroom,
    //                         Facility: getfacility,
    //                         Dorm: element
    //                     }])
    //                 });
    //             })
    //         })
    //     })
    // }, []);

    return (
        <div>
            <Navbar />
            <div className="result-container">
                {dorm.map((data, key) => {
                    return (
                        <div className="dorm-container" key={key} onClick={() => {
                            history.push({
                                pathname: "/dormvisitor",
                                state: data,
                            })
                        }}>
                            <img className='img-dorm-box' src={"img_Dorm/" + data.Image[0].image}></img>
                            <h1>{data.Dorm.dorm_Name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MatchVisitor;