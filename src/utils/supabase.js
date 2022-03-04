import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const insert = async ({ table, data }) => {
	const response = await supabase.from(table).insert([data]);
	if (response.error) console.log(response.error);
};

export const getScore = async (id, a) => {
	const response = await supabase
		.from('acss')
		.select(`K_${a}`)
		.eq('id', id)

	if (response.error) console.log(response.error);
	if (response.data.length === 0) console.log('This entry is not available in the database');

	return response.data[0][`K_${a}`];
}