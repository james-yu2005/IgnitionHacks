import { pipeline } from '@xenova/transformers';

export const EmbedSkill = async (skill) => {
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
    console.log(embedding)
    return embedding;
}