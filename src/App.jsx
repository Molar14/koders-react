import { useState } from "react"
import { useForm } from "react-hook-form"
import {clsx} from "clsx"

function App() {
  const [Koders, setKoders] = useState([])

  const { register, 
    handleSubmit, 
    formState: {errors,isValid,isSubmitted},
    reset
  } = useForm()
  
  function onSubmit(data){
    const Koder = `${data.Name} ${data.LastName} - ${data.Email}`
    setKoders(
      [
        ... Koders, Koder
      ]
    )
    reset()
  }
  
  function removeKoder(indexToRemove){
    // Koders.splice(indexToRemove, 1)
    // setKoders([Koders])
    const newKoders = Koders.filter(((Koders, idx) => idx !== indexToRemove))
    setKoders(newKoders)
  }
  
    return (
      <main className="w-full min-h-screen flex flex-col gap-2">
          <p className="w-full bg-teal-600 text-black font-bold text-center p-2">Koders</p>
          <div className="flex flex-row">
          <form 
        className="flex flex-col gap-5 justify-center p-12 max-w-screen-sm"
        onSubmit={handleSubmit(onSubmit)}
        >
        <input 
        type="text" 
        placeholder="Nombre" 
        className= {clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500": errors.todo,
          })}
        required
        { ... register('Name',{
          required: { value:true, message:"El nombre es necesario"},
          minLength: { value:3, message:"Minimo 3 caracteres..... porfavor"},
          maxLength: { value:180, message:"No me la container te pregunte nomas la hora"},
        }) }
        />
        {
          errors.Name && (
            <p className="text-red-500 text-center text-sm font-semibold">{errors.Name?.message}</p>
          )
        }
        <input 
        type="text" 
        placeholder="Apellido" 
        className= {clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500": errors.todo,
          })}
        required
        { ... register('LastName',{
          required: { value:true, message:"El apellido es necesario"},
          minLength: { value:3, message:"Minimo 3 caracteres..... porfavor"},
          maxLength: { value:180, message:"No me la container te pregunte nomas la hora"},
        }) }
        />
        {
          errors.LastName && (
            <p className="text-red-500 text-center text-sm font-semibold">{errors.LastName?.message}</p>
          )
        }
        <input 
        type='email' 
        placeholder="Correo electronico" 
        className= {clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500": errors.todo,
          })}
        required
        { ... register('Email',{
          required: { value:true, message:"Email es necesario"},
          minLength: { value:3, message:"Minimo 3 caracteres..... porfavor"},
          maxLength: { value:180, message:"No me la container te pregunte nomas la hora"},
        }) }
        />
        {
          errors.Email && (
            <p className="text-red-500 text-center text-sm font-semibold">{errors.Email?.message}</p>
          )
        }
          <button 
          className={clsx("text-black p-3 rounded", {
            "bg-slate-300":isSubmitted ? !isValid : false, 
            "bg-white": isSubmitted ? isValid : true 
          })}
          disabled={isSubmitted ? !isValid : false}
          > 
          + Agregar
          </button>
        </form>
        
        <div className="p-4 flex flex-col gap-2">
          {
            Koders.length === 0 && <p className="text-white/50">No hay koders 🤷‍♂️</p>
          }
          {
            Koders.map((todo, idx)=> {
              return <div key={`todo-${idx}`} className="bg-white/10 rounded p-4 flex flex-row justify-between">
                <span className="select-none">
                {todo}
                </span>
                <span className="text-red-500 cursor-pointer select-none hover:bg-red-500 hover:text-white rounded p-1 text-center " onClick={() => removeKoder(idx)}> 
                X
              </span>
              </div>
              
            }) 
          }
        </div>
          </div>
        
      </main>
    )
}

export default App
