export default function PhotoUpload({ data,setData }){

const upload = (e)=>{

const file = e.target.files[0];

const reader = new FileReader();

reader.onloadend = ()=>{
setData({...data,photo:reader.result});
};

reader.readAsDataURL(file);

};

return(

<input type="file" onChange={upload}/>

);

}