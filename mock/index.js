/**
 * =============================================================================
 *  Mock Layer
 * =============================================================================
 *
 * @author dondevi
 * @create 2017-11-14
 *
 */

import { injectMockService } from "mock/service/index.js";

if (/mock/.test(window.location.search)) {
  injectMockService();
}
