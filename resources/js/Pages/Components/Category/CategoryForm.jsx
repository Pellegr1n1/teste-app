import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import TextAreaInput from '@/Components/TextAreaInput';

export default function CategoryForm() {
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
                <InputLabel htmlFor="tax" value="Taxa" />

                <TextInput
                    id="tax"
                    type="number"
                    className="mt-1 block w-full"
                    value={data.tax}
                    onChange={(e) => setData('tax', e.target.value)}
                    required
                    isFocused
                    autoComplete="tax"
                />

                <InputError className="mt-2" message={errors.quantity} />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Descrição" />

                <TextAreaInput
                    id="description"
                    className="mt-1 block w-full"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                    isFocused
                    autoComplete="description"
                />

                <InputError className="mt-2" message={errors.description} />
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