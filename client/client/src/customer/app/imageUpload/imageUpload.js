export const imageUpload = async (img) => {
    const form = new FormData();
    form.append('testimage', img[0]);
    try {


        let response = await fetch('http://localhost:4000/uploads/single',
            {
                method: 'POST',
                body: form
            }
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

