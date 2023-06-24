const addbtn=document.querySelector("#addbtn");
const main=document.querySelector("#main");

const savenotes = () =>{
      const notes = document.querySelectorAll(".note textarea");
      const data =[];
      notes.forEach(
        (note) =>{
            data.push(note.value);
        }
      )
      if(data.length===0){
        localStorage.removeItem("notes");
      }
      else{
        localStorage.setItem("notes",JSON.stringify(data));
      }
}

addbtn.addEventListener(
    "click",
    function (){
       addnote();
    }
)
//  <div class="note">
//          <div class="tool">
//             <i class="fa-solid fa-floppy-disk"></i>
//             <i class="fa-solid fa-trash"></i>
//          </div>
//          <textarea ></textarea>
//        </div> 

const addnote = (text ="") => {
      const note = document.createElement("div");//makes a div
      note.classList.add("note");
      note.innerHTML=`
              <div class="tool">
                  <i class="save fa-solid fa-floppy-disk"></i>
                  <i class="trash fa-solid fa-trash"></i>
               </div>
               <textarea >${text}</textarea>
      `;
      note.querySelector(".trash").addEventListener(
        "click",
        function (){
            note.remove();
            savenotes();
        }
      )
      note.querySelector(".save").addEventListener(
        "click",
        function (){
            savenotes();
        }
        
    )
    note.querySelector("textarea").addEventListener(/////AUTOSAVE
        "focusout",
         function (){
            savenotes();
         }
    )
      main.appendChild(note);
      savenotes();
}

//autocall function
(
    function(){
       const lsnotes=JSON.parse(localStorage.getItem("notes"));
       if(lsnotes===null){
        addnote();
       }
       else{
        lsnotes.forEach(
            (lsnote)=>{
                addnote(lsnote);
            }
           ) 
       }
    }
)()