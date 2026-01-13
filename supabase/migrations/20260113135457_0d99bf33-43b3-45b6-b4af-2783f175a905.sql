-- Allow authenticated users to insert companies
CREATE POLICY "Authenticated users can insert companies"
ON public.companies
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to insert funding rounds
CREATE POLICY "Authenticated users can insert funding_rounds"
ON public.funding_rounds
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to insert sectors
CREATE POLICY "Authenticated users can insert sectors"
ON public.sectors
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to insert investors
CREATE POLICY "Authenticated users can insert investors"
ON public.investors
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to insert founders
CREATE POLICY "Authenticated users can insert founders"
ON public.founders
FOR INSERT
TO authenticated
WITH CHECK (true);