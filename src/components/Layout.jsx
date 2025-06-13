const Layout = ({children}) => {
    return (
        <div className="flex flex-col w-[100%] h-[100vh]">
            <div className="flex flex-col w-[100%] flex-1">
                {children}
            </div>
            <div className="flex flex-col w-[100%] h-[10vh] bg-gradient-to-t from-[#ed7304] to-[#ffff]">
            </div>
        </div>
    )
}

export { Layout }