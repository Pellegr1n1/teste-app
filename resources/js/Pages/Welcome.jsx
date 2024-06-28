import { Link, Head } from '@inertiajs/react';
import image1 from '@/Assets/Images/sacolas-de-compras.png';
import image2 from '@/Assets/Images/atendimento.png';
import image3 from '@/Assets/Images/experiencia.png';
import image4 from '@/Assets/Images/entrega.png';
import logo from '@/Assets/Images/logo.png';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 bg-white dark:bg-gray-800 dark:text-white/50">

                <div className="relative min-h-screen flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 lg:grid-cols-3">
                            <img id="logo" src={logo} />
                            
                            <div className="flex  lg:col-start-2">

                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Registrar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div
                                    id="docs-card"
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >
                                        <img
                                            id="background1"
                                            className="absolute left-0 top-0 w-full"
                                            src={"https://tm.ibxk.com.br/2012/9/materias/9185683506151515.jpg"}
                                        />
                                        <div className="absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900"></div>
                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div id="docs-card-content" className="flex items-start gap-6 lg:flex-col">
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/70 sm:size-16">
                                                <img
                                                    id="background1"
                                                    className="max-w-[30px]"
                                                    src={image1}
                                                />
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Experimente o Futuro das Compras
                                                </h2>

                                                <p className="mt-4 text-sm/relaxed">
                                                    Things & Foods oferece uma experiência de compra intuitiva e moderna.
                                                    Gerencie produtos, vendas, históricos e realize compras de forma eficiente e sem complicações.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* primeiro */}
                                <div
                                    className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/70 sm:size-16">
                                        <img
                                            id="background1"
                                            className="max-w-[30px]"
                                            src={image2}
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">Atendimento Sob Medida</h2>

                                        <p className="mt-4 text-sm/relaxed">
                                            Assitência personalizada para suas escolhas. Transforme seus produtos e compras em experiências únicas.
                                        </p>
                                    </div>
                                </div>

                                {/* segundo */}
                                <div

                                    className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/70 sm:size-16">
                                        <img
                                            id="background1"
                                            className="max-w-[35px]"
                                            src={image3}
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Parceria para o Sucesso
                                        </h2>

                                        <p className="mt-4 text-sm/relaxed">
                                            Things & Foods oferece uma solução integrada para empresas e clientes,
                                            proporcionando facilidade na gestão e uma experiência de compra memorável.
                                        </p>
                                    </div>
                                </div>

                                {/* terceiro */}
                                <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/70 sm:size-16">
                                        <img
                                            id="background1"
                                            className="max-w-[35px]"
                                            src={image4}
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Entrega Rápida e Confiável
                                        </h2>

                                        <p className="mt-4 text-sm/relaxed">
                                            Seus produtos favoritos entregues com rapidez e cuidado, onde e quando precisar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
