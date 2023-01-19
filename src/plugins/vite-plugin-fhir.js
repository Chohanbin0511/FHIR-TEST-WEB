// import { fhir } from 'fhir';
// import * as fhir from 'fhir.js';

export default function createFhir() {
	const virtualModuleId = 'virtual:fhir-module';
	const resolvedVirtualModuleId = '\0' + virtualModuleId;

	return {
		name: 'create-fhir',
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				return `const msg = 'test'`;
			}
		},
	};
}
