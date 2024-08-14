// import React, { useState } from 'react';
// import TaskModal from './TaskModal';
// import '../TaskTable.css';
// import '../tailwind.css';
// import { CiTextAlignLeft } from "react-icons/ci";
// import { PiCursorLight } from "react-icons/pi";
// import { MdGrid3X3 } from "react-icons/md";
// import { RxLetterCaseUppercase } from "react-icons/rx";

// const TaskTable = ({ tasks, handleGenerate, handleUpdateTask }) => {
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleRowClick = (task) => {
//     setSelectedTask(task);
//     setIsModalOpen(true);
//   };

//   const handleModalSave = (updatedTask) => {
//     handleUpdateTask(updatedTask);
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <table className="task-table">
//         <thead>
//           <tr>
//             <th><RxLetterCaseUppercase />Task Name</th>
//             <th>Dimension</th>
//             <th>Template ID</th>
//             <th className="justify-between flex-1"><CiTextAlignLeft className='ml-4' /><span>Images</span></th>
//             <th className="justify-between flex-1"><CiTextAlignLeft className='ml-4' /><span>Text</span></th>
//             <th><MdGrid3X3 />Amount</th>
//             <th>Gen Type</th>
//             <th className="justify-between flex-1"><PiCursorLight />Gen Tasks</th>
//             <th>Result Ads</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task.task_name}>
//               <td
//                 onClick={() => handleRowClick(task)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {task.task_name}
//               </td>
//               <td>{task.dimension || 'Not Set'}</td>
//               <td>{task.template_id || 'N/A'}</td>
//               <td>
//                 {task.images && task.images.length > 0 ? (
//                   task.images.join(', ')
//                 ) : (
//                   'No images'
//                 )}
//               </td>
//               <td>{task.text || 'N/A'}</td>
//               <td>{task.genPerRef}</td>
//               <td>{task.gen_type || 'N/A'}</td>
//               <td>
//                 <button
//                   className="bg-yellow-100 text-black-400 px-3 py-1 rounded"
//                   onClick={() => handleGenerate(task)}
//                 >
//                   Generate
//                 </button>
//               </td>
//               <td>
//                 <a
//                   href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${task.task_name}_${task.dimension}/format_validation`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-green-200 px-3 py-1 rounded"
//                 >
//                   View Results
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedTask && (
//         <TaskModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           task={selectedTask}
//           onSave={handleModalSave}
//         />
//       )}
//     </>
//   );
// };

// export default TaskTable;














//--------------------------------------------------------------------------------------------

//першочергове




// import React, { useEffect, useState } from 'react';
// import '../TaskTable.css';
// import '../tailwind.css';
// import { CiTextAlignLeft } from "react-icons/ci";
// import { PiCursorLight } from "react-icons/pi";
// import { MdGrid3X3 } from "react-icons/md";
// import { RxLetterCaseUppercase } from "react-icons/rx";

// const dimensionOptions = ['1x1', '9x16', '16x9'];
// const genTypeOptions = ['random_generation', 'cyclic_generation'];

// const TaskTable = ({ tasks, handleGenerate, handleRowClick, handleUpdateTask }) => {
//   const [count, setCount] = useState(0);
//   const [sum, setSum] = useState(0);
//   const [unique, setUnique] = useState(0);
//   const [editingTask, setEditingTask] = useState(null);
//   const [showDimensionOptions, setShowDimensionOptions] = useState(false);
//   const [showGenTypeOptions, setShowGenTypeOptions] = useState(false);

//   useEffect(() => {
//     setCount(tasks.length);
//     setSum(tasks.reduce((total, task) => total + task.genPerRef, 0));
//     setUnique(tasks.filter(task => task.gen_type === 'cyclic_generation').length);
//   }, [tasks]);

//   const handleDimensionChange = (dimension, task) => {
//     const updatedTask = { ...task, dimension };
//     handleUpdateTask(updatedTask);
//     setEditingTask(null);
//     setShowDimensionOptions(false);
//   };

//   const handleGenTypeChange = (gen_type, task) => {
//     const updatedTask = { ...task, gen_type };
//     handleUpdateTask(updatedTask);
//     setEditingTask(null);
//     setShowGenTypeOptions(false);
//   };

//   return (
//     <table className="task-table">
//       <thead>
//         <tr>
//           <th><RxLetterCaseUppercase />Task Name</th>
//           <th>Dimension</th>
//           <th>Template ID</th>
//           <th className="justify-between flex-1  "><CiTextAlignLeft className='ml-4'/><span >Images</span></th>
//           <th className="justify-between flex-1 "><CiTextAlignLeft className='ml-4'/><span >Text</span></th>
//           <th><MdGrid3X3 />Amount</th>
//           <th>Gen Type</th>
//           <th className="justify-between flex-1" > <PiCursorLight />Gen Tasks</th>
//           <th>Result Ads</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr style={{ backgroundColor: '#f7f7f7', textAlign: 'right' }}>
//           <td style={{textAlign: 'right' }} >
//             <span>Count</span> <b>{count}</b>
//           </td>
//           <td colSpan="4" style={{textAlign: 'right' }}></td>
//           <td>
//             <span>Sum</span> <b> {sum}</b></td>
//           <td ><span >Unique</span> <b> {unique}</b> </td>
//           <td colSpan="2" style={{textAlign: 'right' }}></td>
//         </tr>
//         {Array.isArray(tasks) && tasks.map((task) => (
//           <tr key={task.task_name}>
//             <td onClick={() => handleRowClick(task)} style={{ cursor: 'pointer' }}>
//               {task.task_name}
//             </td>
//             <td onClick={(e) => { e.stopPropagation(); setEditingTask(task); setShowDimensionOptions(true); }}>
//               <span className='bg-purple-200 text-black text-center items-center text-xs rounded-lg px-2 py-1' style={{cursor: 'pointer'}}>
//                 {task.dimension}
//               </span>
//               {editingTask === task && showDimensionOptions && (
//                 <div className="dropdown">
//                   {dimensionOptions.map(option => (
//                     <div
//                       key={option}
//                       className="dropdown-item"
//                       onClick={() => handleDimensionChange(option, task)}
//                     >
//                       {option}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </td>
//             <td><span className="bg-pink-300 text-clack px-2 py-1 rounded-xl" >{task.template_id}</span></td>
//             <td>
              // {task.image_layers.map((image, index) => (
              //   <div key={index} className="bg-gray-200 p-2 rounded mb-1">
              //     {image}
              //   </div>
              // ))}
//             </td>
//             <td>{task.text_layers.join(', ')}</td>
//             <td>{task.genPerRef}</td>
//             <td onClick={(e) => { e.stopPropagation(); setEditingTask(task); setShowGenTypeOptions(true); }}>
//               <span className="bg-orange-300 text-black px-2 py-1 rounded-xl" style={{cursor: 'pointer'}}>
//                 {task.gen_type}
//               </span>
//               {editingTask === task && showGenTypeOptions && (
//                 <div className="dropdown">
//                   {genTypeOptions.map(option => (
//                     <div
//                       key={option}
//                       className="dropdown-item"
//                       onClick={() => handleGenTypeChange(option, task)}
//                     >
//                       {option}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </td>
//             <td>
//               <button className="bg-yellow-100 text-black-400 px-3 py-1 rounded" onClick={(e) => { e.stopPropagation(); handleGenerate(task); }}>Generate</button>
//             </td>
//             <td>
//               <a
//                 href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${task.task_name}_${task.dimension}/format_validation`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={(e) => e.stopPropagation()}
//                 className="bg-green-200 px-3 py-1 rounded"
//               >
//                 View Results
//               </a>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TaskTable;


//--------------------------------------------------------------------------------------------











import React, { useEffect, useState } from 'react';
import TaskModal from './TaskModal';
import '../TaskTable.css';
import '../tailwind.css';
import { CiTextAlignLeft } from "react-icons/ci";
import { PiCursorLight } from "react-icons/pi";
import { MdGrid3X3 } from "react-icons/md";
import { RxLetterCaseUppercase } from "react-icons/rx";

const dimensionOptions = ['1x1', '9x16', '16x9'];
const genTypeOptions = ['random_generation', 'cyclic_generation'];



const TaskTable = ({ tasks, handleGenerate, handleUpdateTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [count, setCount] = useState(0);
const [sum, setSum] = useState(0);
const [unique, setUnique] = useState(0);
const [editingTask, setEditingTask] = useState(null);
const [showDimensionOptions, setShowDimensionOptions] = useState(false);
const [showGenTypeOptions, setShowGenTypeOptions] = useState(false);


useEffect(() => {
  setCount(tasks.length);
  setSum(tasks.reduce((total, task) => total + task.genPerRef, 0));
  setUnique(tasks.filter(task => task.gen_type === 'cyclic_generation').length);
}, [tasks]);

  const handleRowClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalSave = (updatedTask) => {
    handleUpdateTask(updatedTask); 
    setIsModalOpen(false);
  };
  

  const handleDimensionChange = (dimension, task) => {
    const updatedTask = { ...task, dimension };
    handleUpdateTask(updatedTask);
    setEditingTask(null);
    setShowDimensionOptions(false);
  };

  const handleGenTypeChange = (gen_type, task) => {
    const updatedTask = { ...task, gen_type };
    handleUpdateTask(updatedTask);
    setEditingTask(null);
    setShowGenTypeOptions(false);
  };

  return (
    <>
      <table className="task-table">
        <thead>
  <tr >
    <th className="flex items-center space-x-1 whitespace-nowrap">
      <RxLetterCaseUppercase className="mr-1 my-3" />
      <span>Task Name</span>
    </th>
    <th className="whitespace-nowrap">
      Dimension
    </th>
    <th className="whitespace-nowrap">
      Template ID
    </th>
    <th className="flex items-center space-x-1 whitespace-nowrap">
      <CiTextAlignLeft className="mr-1 my-3" />
      <span>Images</span>
    </th>
    <th className=" items-center space-x-1 whitespace-nowrap mx-5">
      
      <span className='flex'><CiTextAlignLeft className="mr-2 mt-1 flex-row" />Text</span>
    </th>
    <th className="flex items-center space-x-1 whitespace-nowrap">
      <MdGrid3X3 className="mr-1 my-3" />
      <span>Amount</span>
    </th>
    <th className="whitespace-nowrap">
      Gen Type
    </th>
    <th className="flex items-center space-x-1 whitespace-nowrap">
      <PiCursorLight className="mr-1 my-3" />
      <span>Gen Tasks</span>
    </th>
    <th className="whitespace-nowrap text-center">
      Result Ads
    </th>
  </tr>
</thead>

        <tbody>
        <tr style={{ backgroundColor: '#f7f7f7', textAlign: 'right' }}>
          <td style={{textAlign: 'center' }} >
            <span>Count</span> <b>{count}</b>
          </td>
          <td colSpan="4" style={{textAlign: 'right' }}></td>
          <td>
            <span>Sum</span> <b> {sum}</b></td>
          <td ><span >Unique</span> <b> {unique}</b> </td>
          <td colSpan="2" style={{textAlign: 'right' }}></td>
        </tr>
          {tasks.map((task) => (
            <tr key={task.task_name}>
              <td
                onClick={() => handleRowClick(task)}
                style={{ cursor: 'pointer' }}
              >
                {task.task_name}
              </td>
              <td onClick={(e) => { e.stopPropagation(); setEditingTask(task); setShowDimensionOptions(true); }}>
              <span className='bg-purple-200 text-black text-center items-center text-xs rounded-lg px-2 py-1' style={{cursor: 'pointer'}}>
                {task.dimension}
              </span>
              {editingTask === task && showDimensionOptions && (
                <div className="dropdown">
                  {dimensionOptions.map(option => (
                    <div
                      key={option}
                      className="dropdown-item"
                      onClick={() => handleDimensionChange(option, task)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </td>
            <td><span className="bg-pink-300 text-clack px-2 py-1 rounded-xl" >{task.template_id}</span></td>
            <td>
  {task.images ? (
    task.images.map((image, index) => (
      <div key={index} className="bg-gray-200 p-2 rounded mb-1">
        {image}
      </div>
    ))
  ) : (
    <div > </div> 
  )}
</td>

              <td>{task.text || ' '}</td>
              <td>{task.genPerRef}</td>
              <td onClick={(e) => { e.stopPropagation(); setEditingTask(task); setShowGenTypeOptions(true); }}>
              <span className="bg-orange-300 text-black px-2 py-1 rounded-xl" style={{cursor: 'pointer'}}>
                {task.gen_type}
              </span>
              {editingTask === task && showGenTypeOptions && (
                <div className="dropdown">
                  {genTypeOptions.map(option => (
                    <div
                      key={option}
                      className="dropdown-item"
                      onClick={() => handleGenTypeChange(option, task)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </td>
              <td>
                <button
                  className="bg-yellow-100 text-black-400 px-3 py-1 rounded"
                  onClick={() => handleGenerate(task)}
                >
                  Generate
                </button>
              </td>
              <td>
                <a
                  href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${task.task_name}_${task.dimension}/format_validation`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-200 px-3 py-1 rounded"
                >
                  View Results
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={selectedTask}
          onSave={handleModalSave}
        />
      )}
    </>
  );
};

export default TaskTable;



