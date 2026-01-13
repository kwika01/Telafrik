-- Allow authenticated users to insert countries
CREATE POLICY "Authenticated users can insert countries"
ON public.countries
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to insert sources
CREATE POLICY "Authenticated users can insert sources"
ON public.sources
FOR INSERT
TO authenticated
WITH CHECK (true);