import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SelectLabel from '@/Components/SelectLabel';
import ImageUploadInput from '@/Components/ImageUploadInput';

export default function ProductForm({ auth, categories, onPreviewChange, onResetPreview }) {
    const { data, setData, errors, processing, recentlySuccessful, post, reset } = useForm({
        nmproduct: '',
        qtproduct: '',
        price: '',
        color: '',
        idcategory: '',
        iduser: auth,
        image: null
    });

    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        setListCategory(categories);
    }, [categories]);

    useEffect(() => {
        onPreviewChange(data);
    }, [data]);

    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    const resetForm = () => {
        reset();
        onResetPreview();
    };

    const options = listCategory.map(item => ({
        value: `${item.id}-${item.color}`,
        label: item.nmcategory,
    }));

    return (
        <form onSubmit={submit} method='post' action={route('products.store')} className="mt-6 space-y-6" encType='multipart/form-data'>
            <div>
                <InputLabel htmlFor="nmproduct" value="Nome" />
                <TextInput
                    id="nmproduct"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.nmproduct}
                    onChange={(e) => setData('nmproduct', e.target.value)}
                    required
                    isFocused
                    autoComplete="nmproduct"
                />
                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="qtproduct" value="Quantidade" />
                <TextInput
                    id="qtproduct"
                    type="number"
                    className="mt-1 block w-full"
                    value={data.qtproduct}
                    onChange={(e) => setData('qtproduct', e.target.value)}
                    required
                    autoComplete="qtproduct"
                />
                <InputError className="mt-2" message={errors.quantity} />
            </div>

            <div>
                <InputLabel htmlFor="idcategory" value="Categoria" />
                <SelectLabel
                    options={options}
                    value={data.idcategory}
                    onChange={(e) => {
                        const [id, color] = e.target.value.split('-');
                        setData('idcategory', id);
                        setData('color', color);
                    }}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.idcategory} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="price" value="Preço" />
                <TextInput
                    id="price"
                    className="mt-1 block w-full"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    required
                    autoComplete="price"
                />
                <InputError className="mt-2" message={errors.price} />
            </div>

            <div>
                <InputLabel htmlFor="image" value="Imagem" />
                <ImageUploadInput className="custom-input" id='image' name='image' onChange={(e) => setData('image', e.target.files[0])} required />
                <InputError className="mt-2" message={errors.image} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Cadastrar</PrimaryButton>
                <SecondaryButton type="button" className="text-gray-500" onClick={resetForm}>Cancelar</SecondaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600 dark:text-green-400">Cadastrando...</p>
                </Transition>
            </div>
        </form>
    );
}