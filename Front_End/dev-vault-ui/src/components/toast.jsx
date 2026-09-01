export function ToastMessage({type,msg}){
    if(!msg) return null;
     const styles = {
            "success": 'bg-green-100 border border-green-700 px-2 py-2 text-green-800',
            "error": 'bg-red-100 border border-red-700 px-2 py-2 text-red-800'
        }
    return (
       

        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2" >
            <p className= {`${styles[type]} rounded-lg w-85 text-center`}>{msg}</p>
        </div>

    )
}