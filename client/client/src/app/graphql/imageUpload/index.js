import { Form, Upload } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

export const imageUpload = async (img) => {
    const form = new FormData();
    form.append('testimage', img);
    try {


        let response = await fetch('http://localhost:4000/uploads/single',
            {
                method: 'POST',
                body: form
            },
        )
        return await response.json()
    }
    catch (error) {
        console.log(error);
    }
}

export const imageUploadMultiple = async(images)=>{
    const form  = new FormData();
    let tempArr = [];

    for(let i = 0;i<images.length;i++){
        form.append('testimages',images[i]);
    }

    form.append('testimages',tempArr);
    console.log(form.get('testimages'))
    let response = await fetch('http://localhost:4000/uploads/multiple',{
        method:'POST',
        body:form
    })

    return response.json();

}



export  const ImageUploadComponent = (props) => {
    let max = props.max || 1
    let name = props.name || 'img'
    let listType = props.listType || "picture-card"

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = document.createElement("img");
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
        // const imageshowdiv = document.getElementById('imageshow');
        // imageshowdiv.style.display = 'flex'

        // const div = document.createElement("div");
        // const imgval = document.getElementById("imgdata");
        
        // imgval.src = src
        // setTimeout(()=>{
        //     imageshowdiv.style.display = 'none'
            
        // },8000)
        
    };

    const ImageUpload = ({value, onChange}) => {
        const handleChange = ({fileList}) => {
            onChange(fileList)
        }
        return (
            <Upload disabled={props.disabled || false} className="antd-upload-new" customRequest={ dummyRequest } listType={listType} onPreview={onPreview}
                    accept="image/png, image/gif, image/jpeg"
                    fileList={value} onChange={handleChange} maxCount={max}   >
                {value?.length < max && "+ Add"}
            </Upload>
        )
    }
    return (
        <div className="form-group">
            <Form.Item  name={name} label={props.label || "Image"} rules={props.rules} initialValue={[]}>
                <ImageUpload/>
            </Form.Item>
        </div>
    )
}


export const SingleImageUpload = ({setImageLink,imageLink})=>{

    const handleImageChange =async e =>{
        const file = e.target.files[0];
        
       
        // const response = await imageUpload(file);
        setImageLink(e.target.files[0])
       
    }
    return (
        <div>
            <input id="single-image-btn" style={{display:'none'}} type="file" onChange={handleImageChange}/>

            <div className="border cursor-pointer my-3 shadow rounded w-[150px] h-[150px] flex justify-center items-center ">
                <label htmlFor="single-image-btn">
                   
                    {/* // <img src={URL.createObjectURL(imageLink)} className="w-[150px] h-[150px]"/> */}
                    {
                        imageLink?.length == 0 &&  <AiOutlinePlus size={20}/>
                    }
                    {
                        imageLink?.length !== 0 && <img src={URL.createObjectURL(imageLink)} className="w-[150px] h-[150px]"/> 
                    }
                    
                </label>
            </div>
            
        </div>
    )
}