import { useState } from "react";
import { pipeline } from '@xenova/transformers';
import { supabase } from "../supabase/supabase";
import { useLocation } from "react-router-dom";

const AddSkills = () => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [skill, setSkill] = useState('');

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
      };

    const handleFileUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select files to upload.');
            return;
        }

        const newProgress = {};
        if (selectedFiles.length > 3) {
            alert('Please upload max 3 files!')
            return;
        }
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileName = `${Date.now()}_${file.name}`;

            const { data, error } = await supabase
            .storage
            .from('skill_proof') // Replace with your Supabase bucket name
            .upload(fileName, file, {
                onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                newProgress[file.name] = percentCompleted;
                setUploadProgress({ ...newProgress });
                },
            });

            if (error) {
            console.error(`Error uploading file ${file.name}:`, error.message);
            alert(`Error uploading file ${file.name}`);
            } else {
            console.log(`File uploaded successfully: ${fileName}`, data);
            }
        }
        const pipe = await pipeline(
            'feature-extraction',
            'Supabase/gte-small',
        );
          
        // Generate the embedding from text
        const output = await pipe(skill, {
            pooling: 'mean',
            normalize: true,
        });
          
        // Extract the embedding output
        const embedding = Array.from(output.data);

        const { data, error } = await supabase
            .from('info')
            .update({
            skills: skill,
            embed_skills: embedding,
            })
            .eq('user_id', userId);
    };

    return (
        <div>
            Add a skill that you possess
            <input
                placeholder="Ex. table tennis"
            />
            Enter a description
            <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Ex. I played since I was 14 years old and played on the national team. Over the past few years..."
            />
            Supporting Proof (3 max)
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}

        </div>
    )
}

export default AddSkills;