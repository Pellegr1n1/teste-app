import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import TextAreaInput from '@/Components/TextAreaInput';

export default function CategoryForm({auth}) {

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        nmcategory: '',
        tax: '',
        dscategory: '',
        iduser: auth
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('categories.store'), {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <form onSubmit={submit} action={route('categories.store')} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="nmcategory" value="Nome" />

                <TextInput
                    id="nmcategory"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.nmcategory}
                    onChange={(e) => setData('nmcategory', e.target.value)}
                    required
                    isFocused
                    autoComplete="nmcategory"
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
                    autoComplete="tax"
                />

                <InputError className="mt-2" message={errors.tax} /> {/* Corrigido de 'quantity' para 'tax' */}
            </div>

            <div>
                <InputLabel htmlFor="dscategory" value="Descrição" />

                <TextAreaInput
                    id="dscategory"
                    className="mt-1 block w-full"
                    value={data.dscategory}
                    onChange={(e) => setData('dscategory', e.target.value)}
                    autoComplete="dscategory"
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
                    <p className="text-sm text-gray-600 dark:text-green-400">Cadastrando...</p>
                </Transition>
            </div>
        </form>
    );
}
