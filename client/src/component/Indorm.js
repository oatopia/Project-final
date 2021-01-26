import React from "react";
import './Indorm.css';


export default function Indorm(){

    return(
    <div className="containIn"> 
        <div className="Indorm">
            <h2>ชื่อหอพัก</h2>
            <input></input>
            <br/>
            <h2>ประเภทหอพัก</h2>
            <br/>
            <h2>ที่อยู่</h2>
            <input></input>
            <br/>
            <h2>รายละเอียดค่าใช้จ่าย</h2>
            <h4>เงินมัดจำ/ประกัน</h4>
            <input></input>
            <br/>
            <h4>อัตราค่าน้ำ</h4>
            <input></input>
            <br/>
            <h4>อัตราค่าไฟ</h4>
            <input></input>
            <br/>
            <h4>ค่าส่วนกลาง</h4>
            <input></input>
            <br/>
            <h2>สิ่งอำนวยความสะดวก</h2>
            <input></input>
            <br/>
            <h2>รายละเอียดหอพัก</h2>
            <input></input>
            <br/>
            <h2>ข้อมูลติดต่อ</h2>
            <input></input>
            <br/>
            <h4>ชื่อผู้ดูแลหอพัก</h4>
            <input></input>
            <br/>
            <h4>เบอร์ติดต่อ</h4>
            <input></input>
            <br/>
            <h4>อีเมล</h4>
            <input></input>
            <br/>
            <h4>LineID</h4>
            <input></input>
            <br/>
            <h2>อัลบั้มภาพหอพัก</h2>
            <button className="addimg">เพิ่มรูป</button>
            <br/>
            <button className="save">บันทึก</button>
            
        </div>
    </div>
    );
}