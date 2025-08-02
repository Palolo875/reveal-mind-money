import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Types de remplacement pour les any
const TYPE_REPLACEMENTS = {
  'any[]': 'unknown[]',
  ': any': ': unknown',
  'any;': 'unknown;',
  'any,': 'unknown,',
  'any)': 'unknown)',
  'any }': 'unknown }',
  'any }': 'unknown }',
  'any>': 'unknown>',
  'any =': 'unknown =',
  'any =>': 'unknown =>',
  'any |': 'unknown |',
  'any &': 'unknown &',
  'any[': 'unknown[',
  'any.': 'unknown.',
  'any?': 'unknown?',
  'any!': 'unknown!',
  'any;': 'unknown;',
  'any,': 'unknown,',
  'any)': 'unknown)',
  'any }': 'unknown }',
  'any }': 'unknown }',
  'any>': 'unknown>',
  'any =': 'unknown =',
  'any =>': 'unknown =>',
  'any |': 'unknown |',
  'any &': 'unknown &',
  'any[': 'unknown[',
  'any.': 'unknown.',
  'any?': 'unknown?',
  'any!': 'unknown!',
};

// Types spécifiques pour certains contextes
const CONTEXTUAL_REPLACEMENTS = {
  'data: any': 'data: FinancialData',
  'insights: any': 'insights: AdvancedInsight',
  'result: any': 'result: SimulationResult',
  'costs: any[]': 'costs: HiddenCost[]',
  'link: any': 'link: ShareLink',
  'props: any': 'props: ComponentProps',
  'config: any': 'config: ThemeConfig',
  'event: any': 'event: AppEvent',
  'error: any': 'error: AppError',
};

async function fixTypesInFile(filePath: string) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let modified = false;

    // Remplacer les types contextuels spécifiques
    for (const [pattern, replacement] of Object.entries(CONTEXTUAL_REPLACEMENTS)) {
      if (content.includes(pattern)) {
        content = content.replace(new RegExp(pattern, 'g'), replacement);
        modified = true;
      }
    }

    // Remplacer les types any génériques
    for (const [pattern, replacement] of Object.entries(TYPE_REPLACEMENTS)) {
      if (content.includes(pattern)) {
        content = content.replace(new RegExp(pattern, 'g'), replacement);
        modified = true;
      }
    }

    // Ajouter les imports nécessaires si des types sont utilisés
    if (content.includes('FinancialData') || content.includes('AdvancedInsight')) {
      if (!content.includes("import { FinancialData, AdvancedInsight }")) {
        const importStatement = "import { FinancialData, AdvancedInsight } from '@/types';";
        content = content.replace(/import.*from.*['"]@\/store\/useStore['"];/, 
          `$&\n${importStatement}`);
        modified = true;
      }
    }

    if (modified) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Fixed types in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error);
  }
}

async function main() {
  console.log('🔧 Starting type fixes...');

  // Trouver tous les fichiers TypeScript
  const files = await glob('src/**/*.{ts,tsx}', { ignore: ['node_modules/**'] });

  for (const file of files) {
    await fixTypesInFile(file);
  }

  console.log('✅ Type fixes completed!');
  console.log('📝 Running linter to check remaining issues...');

  try {
    execSync('npm run lint', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Some linting issues remain. Manual review may be needed.');
  }
}

main().catch(console.error);