import react, {useState} from 'react';
import axios from 'axios';
import * as coreComponents from '../../core-components';
import 'react-quill/dist/quill.snow.css';
import QuillEditor from '../../quillEditor/QuillEditor';

type createStoryProps = {
    type?: 'userStory' | 'bug',
}

type bugReqPayloadType = {
    title: string,
    description: string,
    statusId?: number,
    assignedToUserId: number,
    reporterUserId: number,
    userStoryPoint?: number,
    productId: number,
    epicId?: number,
    userStoryType?: string,
    sprintId?: number,
    priority?: number,
};

type userStoryReqPayloadType = Omit<bugReqPayloadType, 'userStoryType' | 'priority'>

const CreateStory: React.FC<createStoryProps> = ({type}) => {

    // TODO: assignedTo, QA engineer as autoSelect (value from product team)
    // Date as date component
    // product, epic as auto select dropdown from db 
    // status as select combobox
    // render priority conditional for bug as combobox
    
    const [reqPayload, setReqPayload] = useState<bugReqPayloadType | userStoryReqPayloadType>();


    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, data?: any) => {
        console.log(event.target.name, event.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const requestPaylod = { data: 'null' };
            await axios.post('http://localhost:3000/save-post', requestPaylod);
            console.log(requestPaylod, 'Post saved successfully');
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Error saving post');
        }
    };

    const validateBugReqPayload = () => {
        const payload = {
            // title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId
        }
    }

    const validateUserStoryReqPayload = () => {
        const payload = {
            // title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId
        }
    }

    const descriptionChange = (content: string) => {
        // name: descriptionChange
    }

    const createdDate = new Date().toISOString().slice(0,10);

    return <div className='user-story-container bg-white p-2'>
        <div className='p-2 mb-4'>
            <coreComponents.Input 
                label='Title'
                type='text'
                name='title'
                placeholder='Title of the work'
                onchange={onInputChange}
                classes='text-base bg-white border-1 border-slate-300 outline-slate-400'
            />
        </div>

        <div className='p-2 mb-4'>
            <div className='text-xs text-slate-700 mb-2'>Description</div>
            <QuillEditor onDescriptionChange={descriptionChange}/>
        </div>

        <div className='mb-2'>

        <div className='grid grid-cols-2 gap-4'>
                <div className='p-2'>
                    <coreComponents.Input 
                        label='Sprint'
                        type='text'
                        name='sprint'
                        placeholder='Sprint'
                        onchange={onInputChange}
                        classes='text-base bg-white border-1 border-slate-300 outline-slate-400'
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.Input 
                        label='Story Point'
                        type='number'
                        name='point'
                        placeholder='2'
                        onchange={onInputChange}
                        classes='text-base bg-white border-1 border-slate-300 outline-slate-400'
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div className='p-2'>
                    <coreComponents.SearchableCombobox 
                        items={['Sprint.1a', 'Sprint.1b', 'Sprint.2a', 'Sprint.2b', 'Sprint.3a', 'Sprint.3b']}
                        onSelect={ ((item: string) => {console.log(item)}) }
                        label='Product Name'
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.SearchableCombobox 
                        items={['UI mockups & wireframe', 'Customer Feedback', 'UI/UX enhancement', 'UI Bugs']}
                        onSelect={ ((item: string) => {console.log(item)}) }
                        label='Epic'
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div className='p-2'>
                    <coreComponents.SearchableCombobox 
                        items={['Rajeev sharma', 'Amit', 'Pankaj', 'Avinash']}
                        onSelect={ ((item: string) => {console.log(item)}) }
                        label='Assigned to'
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.SearchableCombobox 
                        items={['Pankaj', 'Avinash', 'Rajeev sharma', 'Amit']}
                        onSelect={ ((item: string) => {console.log(item)}) }
                        label='QA Engineer'
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div className='p-2'>
                    <coreComponents.Input 
                        label='Status'
                        type='text'
                        name='status'
                        placeholder='New'
                        onchange={onInputChange}
                        classes='text-base bg-white border-1 border-slate-300 outline-slate-400'
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.DateInput 
                        label='Date'
                        name='date'
                        value={createdDate}
                        onchange={onInputChange}
                        disabled={true}
                        classes='text-base bg-white border-1 border-slate-300 outline-slate-400'
                    />
                </div>
            </div>

            <div className='flex justify-end gap-4 pt-4 pb-4 pr-2'>
                <div>
                    <coreComponents.Button 
                        label="Reset"
                        type="default"
                        clickHandler={handleSubmit}
                        disabled={true}
                    />
                </div>
                <div>
                    <coreComponents.Button 
                        label="Submit"
                        type="primary"
                        clickHandler={handleSubmit}
                        disabled={true}
                    />
                </div>
            </div>

            
        </div>
    </div>
}

export default CreateStory;