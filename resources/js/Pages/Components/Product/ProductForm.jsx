import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SelectLabel from '@/Components/SelectLabel';
import ImageUploadInput from '@/Components/ImageUploadInput';

export default function ProductForm({auth}) {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        name: '',
        category: '',
        quantity: null,
        price: ''
    });

    const submit = (e) => {
        e.preventDefault();

        console.log(e);
        //patch(route('teste'));
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Nome" />

                <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="quantity" value="Quantidade" />

                <TextInput
                    id="quantity"
                    type="number"
                    className="mt-1 block w-full"
                    value={data.quantity}
                    onChange={(e) => setData('quantity', e.target.value)}
                    required
                    autoComplete="quantity"
                />

                <InputError className="mt-2" message={errors.quantity} />
            </div>

            <div>
                <InputLabel htmlFor="category" value="Categoria" />

                <SelectLabel
                    options={options}
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className="mt-1 block w-full"
                />

                <InputError message={errors.category} className="mt-2" />
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

                <ImageUploadInput 
                    className="custom-input"
                />

                <InputError className="mt-2" message={errors.image} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Cadastrar</PrimaryButton>
                <SecondaryButton type="button" className="text-gray-500">Cancelar</SecondaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cadastrando</p>
                </Transition>
            </div>
        </form>
    );
}