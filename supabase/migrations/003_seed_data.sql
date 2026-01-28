-- =====================================================
-- TelAfrik Seed Data
-- Run this AFTER 002_rls_policies.sql
-- =====================================================

-- =====================================================
-- AFRICAN COUNTRIES (54 countries)
-- =====================================================

INSERT INTO countries (name, code, region, flag_emoji) VALUES
-- West Africa (16)
('Nigeria', 'NG', 'West Africa', '🇳🇬'),
('Ghana', 'GH', 'West Africa', '🇬🇭'),
('Senegal', 'SN', 'West Africa', '🇸🇳'),
('Côte d''Ivoire', 'CI', 'West Africa', '🇨🇮'),
('Mali', 'ML', 'West Africa', '🇲🇱'),
('Burkina Faso', 'BF', 'West Africa', '🇧🇫'),
('Niger', 'NE', 'West Africa', '🇳🇪'),
('Guinea', 'GN', 'West Africa', '🇬🇳'),
('Benin', 'BJ', 'West Africa', '🇧🇯'),
('Togo', 'TG', 'West Africa', '🇹🇬'),
('Sierra Leone', 'SL', 'West Africa', '🇸🇱'),
('Liberia', 'LR', 'West Africa', '🇱🇷'),
('Mauritania', 'MR', 'West Africa', '🇲🇷'),
('The Gambia', 'GM', 'West Africa', '🇬🇲'),
('Guinea-Bissau', 'GW', 'West Africa', '🇬🇼'),
('Cape Verde', 'CV', 'West Africa', '🇨🇻'),

-- East Africa (14)
('Kenya', 'KE', 'East Africa', '🇰🇪'),
('Tanzania', 'TZ', 'East Africa', '🇹🇿'),
('Uganda', 'UG', 'East Africa', '🇺🇬'),
('Rwanda', 'RW', 'East Africa', '🇷🇼'),
('Ethiopia', 'ET', 'East Africa', '🇪🇹'),
('Somalia', 'SO', 'East Africa', '🇸🇴'),
('Djibouti', 'DJ', 'East Africa', '🇩🇯'),
('Eritrea', 'ER', 'East Africa', '🇪🇷'),
('South Sudan', 'SS', 'East Africa', '🇸🇸'),
('Burundi', 'BI', 'East Africa', '🇧🇮'),
('Comoros', 'KM', 'East Africa', '🇰🇲'),
('Mauritius', 'MU', 'East Africa', '🇲🇺'),
('Seychelles', 'SC', 'East Africa', '🇸🇨'),
('Madagascar', 'MG', 'East Africa', '🇲🇬'),

-- North Africa (6)
('Egypt', 'EG', 'North Africa', '🇪🇬'),
('Morocco', 'MA', 'North Africa', '🇲🇦'),
('Algeria', 'DZ', 'North Africa', '🇩🇿'),
('Tunisia', 'TN', 'North Africa', '🇹🇳'),
('Libya', 'LY', 'North Africa', '🇱🇾'),
('Sudan', 'SD', 'North Africa', '🇸🇩'),

-- Central Africa (9)
('Cameroon', 'CM', 'Central Africa', '🇨🇲'),
('Democratic Republic of Congo', 'CD', 'Central Africa', '🇨🇩'),
('Republic of Congo', 'CG', 'Central Africa', '🇨🇬'),
('Gabon', 'GA', 'Central Africa', '🇬🇦'),
('Equatorial Guinea', 'GQ', 'Central Africa', '🇬🇶'),
('Central African Republic', 'CF', 'Central Africa', '🇨🇫'),
('Chad', 'TD', 'Central Africa', '🇹🇩'),
('São Tomé and Príncipe', 'ST', 'Central Africa', '🇸🇹'),
('Angola', 'AO', 'Central Africa', '🇦🇴'),

-- Southern Africa (9)
('South Africa', 'ZA', 'Southern Africa', '🇿🇦'),
('Botswana', 'BW', 'Southern Africa', '🇧🇼'),
('Namibia', 'NA', 'Southern Africa', '🇳🇦'),
('Zimbabwe', 'ZW', 'Southern Africa', '🇿🇼'),
('Zambia', 'ZM', 'Southern Africa', '🇿🇲'),
('Mozambique', 'MZ', 'Southern Africa', '🇲🇿'),
('Malawi', 'MW', 'Southern Africa', '🇲🇼'),
('Lesotho', 'LS', 'Southern Africa', '🇱🇸'),
('Eswatini', 'SZ', 'Southern Africa', '🇸🇿');

-- =====================================================
-- SECTORS (10 main sectors)
-- =====================================================

INSERT INTO sectors (name, slug, description, icon) VALUES
('Fintech', 'fintech', 'Financial technology including payments, banking, lending, and insurance', '💳'),
('Healthtech', 'healthtech', 'Healthcare technology including telemedicine, diagnostics, and health management', '🏥'),
('Agritech', 'agritech', 'Agricultural technology including farming, supply chain, and food processing', '🌾'),
('Edtech', 'edtech', 'Education technology including e-learning, skills training, and educational tools', '📚'),
('Logistics', 'logistics', 'Logistics and supply chain including delivery, warehousing, and freight', '🚚'),
('E-commerce', 'ecommerce', 'Online retail and marketplace platforms', '🛒'),
('Cleantech', 'cleantech', 'Clean energy and environmental technology', '🌱'),
('PropTech', 'proptech', 'Real estate and property technology', '🏠'),
('InsurTech', 'insurtech', 'Insurance technology and digital insurance products', '🛡️'),
('HR Tech', 'hrtech', 'Human resources and talent management technology', '👥'),
('Mobility', 'mobility', 'Transportation and mobility solutions', '🚗'),
('Media & Entertainment', 'media', 'Digital media, entertainment, and content platforms', '🎬'),
('Enterprise SaaS', 'enterprise-saas', 'Business software and enterprise solutions', '💼'),
('Consumer Tech', 'consumer-tech', 'Consumer-facing technology products and services', '📱'),
('AI & Data', 'ai-data', 'Artificial intelligence and data analytics', '🤖');

-- =====================================================
-- DEFAULT ADMIN USER (update email as needed)
-- =====================================================

-- NOTE: You'll need to manually add your admin user after they sign up
-- Run this after creating your admin account:
-- 
-- INSERT INTO user_roles (user_id, role)
-- SELECT id, 'admin' FROM auth.users WHERE email = 'your-admin@email.com';
