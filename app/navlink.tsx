import Link from "next/link";

type Props = {
    category: string;
    isActive: boolean;
}

function NavLink({ category, isActive }: Props) {
    return (
        <Link href={`/news/${category}`} className={`navLink capitalize hover:underline active:underline-offset-8 hover:font-bold hover:scale-110 duration-200 ease-out
    ${isActive && "underline decoration-orange-400 underline-offset-4 font-bold text-lg"}
    `}>{category}</Link>
    );

}

export default NavLink;
