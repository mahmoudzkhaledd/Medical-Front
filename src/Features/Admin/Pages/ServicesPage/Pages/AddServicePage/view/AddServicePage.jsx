import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import UploadImageDropzone from "../Components/UploadImageDropzone";
import { toast } from "react-toastify";
import { useState } from "react";
import { adminAxios, adminAxios as axios } from "@/Utils/AdminAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import './style.css';
import { RiDeleteBin6Line } from "react-icons/ri";
function convertBase64(file) {

    return new Promise((res, rej) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            res(fileReader.result);
        }
        fileReader.readAsDataURL(file);
        fileReader.onerror = (error) => {
            rej(error);
        }
    })
}
export default function AddServicePage({ editMode }) {
    const params = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const handelImage = () => {
        const files = document.getElementById('dropzone-file');
        if (!(files != null && files.files != null && files.files.length != 0)) return;
        const file = files.files[0];
        if (file.size / 1000000 > 1) {
            files.value = null;
            toast.error("من فضلك اختر ملف أقل من 1MB");
            return;
        }
        setImage(URL.createObjectURL(files.files[0]));
    };
    const deleteImage = async () => {
        const files = document.getElementById('dropzone-file');
        if (files != null && files.files.length != 0) {
            files.value = null;
            setImage(null);

        } else {
            if (!window.confirm("هل أنت متأكد من حذف الصورة؟")) return;
            setLoading(true);
            try {
                const res = await adminAxios.delete(`services/${params.id}/delete-image`);
                data.data.service.thumbnailImage = null;
                setImage(null)
                toast("تم حذف الصورة بنجاح");
            } catch (ex) {
                toast.error(ex.message)
            }
            setLoading(false);
        }

    }
    const addService = async (e) => {
        e.preventDefault();
        const form = document.getElementById("add-service-form");
        const { name, price, description, category, subDescription } = Object.fromEntries(new FormData(form).entries());

        try {
            if (name == "" || price == "" || description == "" || category == "" || subDescription == "") {
                throw "يجب ادخال كافة البيانات المطلوبة";
            }
            setLoading(true);

            const thumbnailImage = (image == null || document.getElementById('dropzone-file').files.length == 0) ? null : await convertBase64(document.getElementById('dropzone-file').files[0]);
            const res = !editMode ? await axios.post('services', { name, price, description, category, thumbnailImage, subDescription })
                : await axios.put(`services/${data.data.service._id}`, { name, price, description, category, thumbnailImage, subDescription });
            toast(editMode ? "تم تعديل الخدمة بنجاح" : "تم اضافة الخدمة بنجاح");
            nav(`/admin/services/${res.data.service._id}`, { replace: true });

        } catch (ex) {
            if (ex.response == null) {
                toast.error(ex);
                return;
            }
            toast.error(ex.message);
        }
        setLoading(false);
    }
    const { isLoading, error, data, refetch } = useQuery(
        "get-sertice",
        () => adminAxios.get(`services/${params.id || ""}`),
        {
            retry: 1,
            enabled: params.id != null,
            refetchOnWindowFocus: false,
        },
    );


    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <SorryDiv message="هذه الخدمة غير موجودة, الرجاء المحاولة مرة اخرى مع خدمة مختلفة" />
    }
    if (image == null && data != null && data.data.service.thumbnailImage != null && params.id != null) {
        setImage(data.data.service.thumbnailImage.url);
    }
    return (
        <div className="flex flex-col  px-6 py-8  md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {
                            editMode ? "تعديل الخدمة" : "إضافة خدمة جديدة"
                        }
                    </h1>
                    <UploadImageDropzone className={(image) == null ? "" : "hidden"} id="dropzone-file" onChange={handelImage} />
                    <div className={`${(image) != null ? "" : "hidden"} containerr mx-auto  w-fit`}>
                        <img alt="" className={`img  rounded-xl aspect-auto max-w-xl sm-fit-w object-cover`} src={image} />
                        <div className="middle">
                            <Button loading={loading} fontSize={20} verticalPadding={20} onClick={deleteImage} disabled={loading} icon={<RiDeleteBin6Line />} className="mr-auto" />
                        </div>
                    </div>
                    <form id="add-service-form" className="flex flex-col gap-4" >
                        <TextBox initialValue={params.id != null ? data?.data.service.name : null} disabled={loading} required={true} name="name" placeholder="اسم الخدمة" label="اسم الخدمة" />
                        <TextBox initialValue={params.id != null ? data?.data.service.category : null} disabled={loading} required={true} name="category" placeholder="تصنيف الخدمة" label="تصنيف الخدمة" />
                        <TextBox initialValue={params.id != null ? data?.data.service.price : null} disabled={loading} required={true} name="price" placeholder="السعر" label="سعر الخدمة" type="number" />
                        <TextBox maxLength={150} initialValue={params.id != null ? data?.data.service.subDescription : null} disabled={loading} required={true} name="subDescription" placeholder="وصف مختصر" label="الوصف المختصر" area={true} />
                        <TextBox initialValue={params.id != null ? data?.data.service.description : null} disabled={loading} required={true} name="description" placeholder="الوصف" label="الوصف" area={true} />
                        <Button loading={loading} disabled={loading} text={editMode ? "تعديل الخدمة" : "إضافة الخدمة"} className=" mr-auto" onClick={addService} />
                    </form>
                </div>
            </div>
        </div>
    )
}
